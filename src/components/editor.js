import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import metadata from "../js/metadata.js";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Form from "./Form";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import JSONPretty from "./JSONPretty";
import Indicator from "./verificationIndicator";
import Notification from "./notification";
import Tooltip from "@material-ui/core/Tooltip";

// http://localhost:3000/edit/0x267be1c1d684f78cb4f6a176c4911b741e4ffdc0 kraken
// http://localhost:3000/edit/0x42d6622dece394b54999fbd73d108123806f6a18 spankchain
// http://localhost:3000/edit/0x6090a6e47849629b7245dfa1ca21d94cd15878ef ens

let metaData = {};

const styles = theme => ({
  popper: {
    opacity: 1,
  },
  lightTooltip: {
    background: "#fefefe",
    color: theme.palette.text.primary,
    boxShadow:
      "0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 3px 2px 0px rgba(0, 0, 0, 0.01), 0px 3px 1px -2px rgba(0, 0, 0, 0.01)",
    fontFamily: "Hack, Source Code Pro",
    fontSize: 9,
    opacity: 1,
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: "none",
  },
});

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      metadata: {},
      curator: false,
      isScam: false,
      userAddress: "",
      open: false,
      notification: "",
      variant: "",
      price: 0,
      network: 3,
    };
    this.form = React.createRef();
  }

  componentWillMount() {
    metaData = new metadata();
    if (this.state.address !== this.props.address) {
      this.setState({ address: this.props.address });
    }
    metaData.getPrice().then(result => {
      this.setState({ price: result });
    });
    metaData.isCurator().then(result => {
      this.setState({ curator: result });
    });
    this.setState({ userAddress: metaData.getCurrentAccount() });
    this.clearEditor();
    this.getAddress(this.props.address);
  }

  componentDidMount() {
    metaData.getMetamask();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.address !== this.props.address) {
      // console.log(metaData.isValidAddress(this.props.address));
      this.setState({ address: this.props.address });
      if (metaData.isValidAddress(this.props.address))
        this.getAddress(this.props.address);
      else this.clearEditor();
    }
    return true;
  }

  getAddress(address) {
    if (metaData.isValidAddress(address))
      metaData.getAddressData(address).then(contractdata => {
        this.populateEditor(contractdata);
        this.props.setType(contractdata);
      });
  }

  clearEditor() {
    let json = metaData.getEmptyObject();
    json.address = this.props.address;
    this.setState({
      metadata: json.metadata,
      contractdata: json,
      permission: this.permissionText(json),
    });
  }

  populateEditor(contractdata) {
    if (!contractdata) return;
    let md = contractdata.data.metadata;
    console.log(contractdata);
    this.setState({
      metadata: md,
      contractdata: contractdata,
      permission: this.permissionText(contractdata),
      isContract:
        (md.contract.name && md.contract.name.length > 0) ||
        md.contract.interfaces.length > 0,
      isScam: md.reputation.category === "scam",
      file: undefined,
    });
  }

  onSubmit = async e => {
    let data = metaData.getEmptyObject();
    // console.log(data);
    console.log(this.form);
    console.log(this.form.metadata);
    data.address = this.state.address;
    data.metadata.name = this.state.mName;
    data.metadata.url = this.state.mUrl;
    data.metadata.description = this.state.mDescription;
    // console.log(this.state.mScam);
    if (this.state.isScam === true) {
      // console.log("WHY");
      data.metadata.reputation.status = "blocked";
      data.metadata.reputation.category = "scam";
    }
    if (this.state.isContract === true) {
      data.metadata.contract.name = this.state.mContractName;
      data.metadata.contract.compiler = this.state.mCompiler;
      data.metadata.contract.optimizer = this.state.mOptimizer;
      data.metadata.contract.language = this.state.mLanguage;
      data.metadata.contract.swarm = this.state.mSwarm;
      data.metadata.contract.source = this.state.mSource;
      data.metadata.contract.abi = this.state.mAbi;
      data.metadata.contract.constructor_arguments = this.state.mConstructor;
      if (this.state.mInterfaces.length > 0) {
        let interfaces = this.state.mInterfaces.split(",").map(Number);
        data.metadata.contract.interfaces = interfaces;
      }
    }
    if (this.implementsTokenInterface()) {
      // console.log("WHY");
      data.metadata.token.ticker = this.state.mSymbol;
      data.metadata.token.decimals = this.state.mDecimals;
    }
    if (this.state.file)
      data.metadata.logo = await metaData.convertBlobToBase64(this.state.file);
    else if (this.state.metadata.logo) {
      data.metadata.logo = this.state.metadata.logo;
    }

    this.setState({
      address: this.state.address,
      open: true,
      notification: "Transaction waiting for approval",
      variant: "info",
    });
    metaData
      .storeMetadata(data.address, this.state.mName, data, () => {
        this.onTransactionReceipt();
      })
      .then(response => {
        this.setState({
          address: this.state.address,
          open: true,
          notification: "Transaction submitted",
          variant: "success",
        });
      })
      .catch(error => {
        // console.log(error);
        this.setState({
          open: true,
          notification: "Error submitting transaction",
          variant: "error",
        });
      });
  };

  onTransactionReceipt() {
    this.setNotification(true, "Your submission has been processed", "success");
    this.getAddress(this.state.address);
    this.forceUpdate();
  }

  setNotification(open, notification, variant) {
    this.setState({
      open: open,
      notification: notification,
      variant: variant,
    });
  }

  permissionText(contractdata) {
    let currentAccount = metaData.getCurrentAccount();
    if (!contractdata) return "disconnected";
    if (contractdata.self_attested || contractdata.curated) {
      if (currentAccount && currentAccount === contractdata.address)
        return "verified_self";
      if (contractdata.self_attested) return "verified";
      if (contractdata.curated) return "curated";
    }
    return "any";
  }

  getBadges(contractdata) {
    let badges = [];
    if (this.state.isScam) badges.push("scam");
    if (contractdata.self_attested) badges.push("self");
    else badges.push("info");
    if (contractdata.verified) badges.push("verified");
    if (contractdata.curated) badges.push("locked");
    if (badges.length === 0) badges.push("unkown");
    return badges;
  }

  canEdit(contractdata) {
    let currentAccount = metaData.getCurrentAccount();
    if (!currentAccount) return { allowed: false, reason: "Not logged in" };
    if (this.state.curator)
      return { allowed: true, reason: "You are a curator" };
    if (contractdata.self_attested || contractdata.curated) {
      if (
        currentAccount === contractdata.address &&
        contractdata.self_attested
      ) {
        return { allowed: true, reason: "You self-attested this data" };
      } else if (contractdata.curated && this.state.curator) {
        return { allowed: true, reason: "You are a curator" };
      }
      return {
        allowed: false,
        reason: "Contract is self attested or curated",
      };
    }
    return {
      allowed: true,
      reason: "You are logged in and can edit this data",
    };
  }

  canSubmit(contractdata) {
    return true;
    if (!metaData.isValidAddress(this.state.address))
      return {
        allowed: false,
        reason: "Please enter a valid address to submit information",
      };
    if (!(this.state.metadata.name.length > 0))
      return {
        allowed: false,
        reason: "Enter a name to submit information",
      };
    if (!contractdata) return { allowed: false, reason: "Nothing to submit" };
    return this.canEdit(contractdata);
  }

  attentionText(contractdata) {
    if (
      contractdata.self_attested &&
      contractdata.address !== metaData.getCurrentAccount()
    )
      return "This address metadata has been submitted by the owner of this address and cannot be edited";
    if (!this.state.curator && contractdata.curated)
      return "This address is curated and can only be edited by curators.";
    return "";
  }

  implementsTokenInterface() {
    return (
      (this.state.isContract && this.state.knownInterfaces.indexOf(20) > -1) ||
      this.state.knownInterfaces.indexOf(998) > -1 ||
      this.state.knownInterfaces.indexOf(884) > -1 ||
      this.state.knownInterfaces.indexOf(865) > -1 ||
      this.state.knownInterfaces.indexOf(948) > -1 ||
      this.state.knownInterfaces.indexOf(777) > -1
    );
  }

  render() {
    const { classes } = this.props;
    let image = this.state.file
      ? this.state.file[0].preview
      : this.state.metadata.logo
        ? this.state.metadata.logo
        : "data:image/png;base64,R0lGODlhAQABAIAAAPr6+gAAACwAAAAAAQABAAACAkQBADs=";
    let preview = <img src={image} alt="Uploaded logo" />;
    const { state } = this;

    return (
      <div className="editform" id="editform">
        <Form
          ref={this.form}
          metadata={state.metadata}
          submitter={state.contractdata.submitter}
          badges={this.getBadges(state.contractdata)}
        />
        <div className="button-aligner">
          <Tooltip
            title={
              !this.canSubmit(this.state.contractdata).allowed
                ? "Can't submit: " +
                  this.canSubmit(this.state.contractdata).reason
                : ""
            }
            classes={{
              tooltip: this.props.classes.lightTooltip,
              popper: this.props.classes.popper,
            }}
            enterDelay={200}
            leaveDelay={200}
          >
            <span>
              <Button
                disabled={!this.canSubmit(this.state.contractdata).allowed}
                size="small"
                variant="contained"
                onClick={this.onSubmit}
                className={" button"}
                color="secondary"
                elevation={0}
                style={{ color: "white" }}
              >
                Submit Metadata
              </Button>
            </span>
          </Tooltip>
          <Button variant="outlined" disabled size="small">
            {this.state.curator ? 0 : this.state.price} Ξ
          </Button>
        </div>

        <Notification
          open={this.state.open}
          message={this.state.notification}
          variant={this.state.variant}
        />
      </div>
    );
  }
}

// <br />
// <br />
// <h2>Metadata JSON</h2>
// <JSONPretty json={JSON.stringify(this.state.contractdata)} />

Editor.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Editor);

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

let Registry = {};

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
    Registry = new metadata();
    if (this.state.address !== this.props.address) {
      this.setState({ address: this.props.address });
    }
    Registry.getPrice().then(result => {
      this.setState({ price: result });
    });
    Registry.isCurator().then(result => {
      this.setState({ curator: result });
    });
    this.setState({ userAddress: Registry.getCurrentAccount() });
    this.clearEditor();
    this.getAddress(this.props.address);
  }

  componentDidMount() {
    Registry.getMetamask();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.address !== this.props.address) {
      // console.log(Registry.isValidAddress(this.props.address));
      this.setState({ address: this.props.address });
      if (Registry.isValidAddress(this.props.address))
        this.getAddress(this.props.address);
      else this.clearEditor();
    }
    return true;
  }

  getAddress(address) {
    if (Registry.isValidAddress(address))
      Registry.getAddressData(address).then(contractdata => {
        this.populateEditor(contractdata);
        this.props.setType(contractdata);
      });
  }

  clearEditor() {
    let json = Registry.getEmptyObject();
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
    if (!md) return;
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
    let data = Registry.getEmptyObject();
    // console.log(data);

    const { props } = this.form.current;
    const { metadata } = this.form.current.state;
    console.log(this.form, data, metadata);
    metadata.address = this.state.address;
    data.address = this.state.address;

    //check if files are string or not
    if (typeof metadata.logo !== "string") {
      try {
        let logo = await Registry.convertBlobToBase64(metadata.logo);
        metadata.logo = logo;
      } catch (e) {
        throw e + "go blob yourself! (this should not appear in production)";
      }
    }
    if (typeof metadata.contract.abi !== "string") {
      try {
        let abi = await Registry.storeJsonIPFS(metadata.contract.abi);
        metadata.contract.abi = abi;
      } catch (e) {
        throw e + "go abi yourself! (this should not appear in production)";
      }
    }
    if (typeof metadata.contract.source !== "string") {
      try {
        let source = await Registry.storeDataIPFS(metadata.contract.source);
        metadata.contract.source = source;
      } catch (e) {
        throw e + "go source yourself! (this should not appear in production)";
      }
    }
    // data.metadata = metadata;
    Object.assign(data.metadata, metadata);
    this.setState({
      address: data.address,
      metadata: metadata,
      open: true,
      notification: "Transaction waiting for approval",
      variant: "info",
    });
    Registry.storeMetadata(metadata.address, metadata.name, data, () => {
      this.onTransactionReceipt();
    })
      .then(response => {
        this.setState({
          address: data.address,
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
    let currentAccount = Registry.getCurrentAccount();
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
    let currentAccount = Registry.getCurrentAccount();
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
    // return {
    //   allowed: true,
    //   reason: "You hacked it",
    // };
    if (!Registry.isValidAddress(this.state.address))
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
      contractdata.address !== Registry.getCurrentAccount()
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

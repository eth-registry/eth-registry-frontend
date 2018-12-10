import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Form from "./Form";
import FormReport from "./Form_Report";
import Button from "@material-ui/core/Button";
// import JSONPretty from "./JSONPretty";
import Notification from "./notification";
import Tooltip from "@material-ui/core/Tooltip";
import EthRegisty from "eth-registry";

const registry = new EthRegisty();

// http://localhost:3000/edit/0x267be1c1d684f78cb4f6a176c4911b741e4ffdc0 kraken
// http://localhost:3000/edit/0x42d6622dece394b54999fbd73d108123806f6a18 spankchain
// http://localhost:3000/edit/0x6090a6e47849629b7245dfa1ca21d94cd15878ef ens

// 1st iteration of contract depends on external logic, not contract logic, to determine it's assumptions. This is a trade-off in making extra contract calls to make assumptions for contract simplicity & security.

// Current curation logic:

// Prioritize what we display:
// - Malicious > Verified > Scam > Self attested > Hearsay

// - Anyone can submit at any time
// - Curation logic is external from contract
// - Instead we use the version history
// - Version history is used for the curational aspect
// - Latest re-submission by a curator counts as the verified version

// Future:

// Add 'tags' to JSON spec
// How to deal with versioning?

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
      permissions: {},
    };
    this.form = React.createRef();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.address !== this.state.address) {
      this.setState({ address: nextProps.address });
      this.clearEditor();
      this.getAddress(nextProps.address);
    }
  }

  componentWillMount() {
    if (this.state.address !== this.props.address) {
      this.setState({
        address: this.props.address,
      });
    }
    registry.price().then(result => {
      this.setState({
        price: result,
      });
    });

    // FIXME: should set this to current user address
    // this.setState({ userAddress: Registry.getCurrentAccount() });
    // FIXME: should check if current user is curator
    // Registry.isCurator(this.state.userAddress).then(result => {
    //   this.setState({ curator: result });
    // });
    this.clearEditor();
    this.getAddress(this.props.address);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.address !== this.props.address) {
      this.setState({ address: this.props.address });
      if (registry.isValidAddress(this.props.address))
        this.getAddress(this.props.address);
      else this.clearEditor();
    }
    return true;
  }

  //probably the dirtiest way to do this
  editorFormDidChange() {
    this.setState({
      permissions: this.canSubmit(this.state.contractdata),
    });
  }

  getAddress(address) {
    if (registry.isValidAddress(address))
      registry.get(address).then(contractdata => {
        if (this.populateEditor(contractdata)) {
          this.props.setType(contractdata);
        } else {
          this.clearEditor();
        }
      });
  }

  clearEditor() {
    let json = registry.getEmptyObject();
    json.address = this.props.address;
    this.setState({
      metadata: json.metadata,
      contractdata: json,
      permission: this.permissionText(json),
    });
    if (this.form.current) this.form.current.populateForm(json.metadata, json);
  }

  populateEditor(contractdata) {
    if (!contractdata) return;
    let md = contractdata.data.metadata;
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

    this.form.current.populateForm(md, contractdata);
    return true;
  }

  onSubmit = async e => {
    let data = registry.getEmptyObject();
    const { metadata } = this.form.current.state;
    metadata.address = this.state.address;
    data.address = this.state.address;

    //check if files are string or not
    if (typeof metadata.logo !== "string") {
      try {
        let logo = await registry.convertBlobToBase64(metadata.logo);
        metadata.logo = logo;
      } catch (e) {
        throw console.warn(e);
      }
    }
    if (typeof metadata.contract.abi !== "string") {
      try {
        let abi = await registry.storeJsonIPFS(metadata.contract.abi);
        metadata.contract.abi = abi;
      } catch (e) {
        throw console.warn(e);
      }
    }
    if (typeof metadata.contract.source !== "string") {
      try {
        let source = await registry.storeDataIPFS(metadata.contract.source);
        metadata.contract.source = source;
      } catch (e) {
        throw console.warn(e);
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
    registry
      .storeMetadata(metadata.address, metadata.name, data, () => {
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
    let currentAccount = undefined; //Registry.getCurrentAccount();
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
    // FIXME: should be set to current account
    let currentAccount = undefined; //Registry.getCurrentAccount();

    let badges = [];
    if (!registry.isValidAddress(this.state.address)) {
      badges.push("unknown");
      return badges;
    }
    // console.log(contractdata);
    if (this.state.isScam) badges.push("scam");
    //TODO: only show self attested badge when form is empty or is actually self attested
    if (
      (currentAccount &&
        this.state.address.toLowerCase() === currentAccount.toLowerCase()) ||
      contractdata.self_attested
    )
      badges.push("self");
    else badges.push("info");
    if (contractdata.verified) badges.push("verified");
    if (contractdata.curated) badges.push("locked");
    if (badges.length === 0) badges.push("unkown");
    return badges;
  }

  canEdit(contractdata) {
    // FIXME: should be set to current account
    let currentAccount = undefined; //registry.getCurrentAccount();
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
    if (!this.form.current)
      return {
        allowed: false,
        reason: "Can't hack this, https://www.youtube.com/watch?v=otCpCn0l4Wo",
      };
    const { metadata } = this.form.current.state;
    if (!registry.isValidAddress(this.state.address))
      return {
        allowed: false,
        reason: "Please enter a valid address to submit information",
      };

    if (!(metadata.name.length > 0))
      return {
        allowed: false,
        reason: "Enter a name to submit information",
      };
    if (!contractdata) return { allowed: false, reason: "Nothing to submit" };
    return this.canEdit(contractdata);
  }

  attentionText(contractdata) {
    // FIXME: should be set to current account
    if (
      contractdata.self_attested &&
      contractdata.address !== "" // FIXME: Registry.getCurrentAccount()
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
    const { state } = this;
    const { permissions } = state;

    const form = this.props.location.pathname.includes("report") ? (
      <FormReport
        ref={this.form}
        metadata={state.metadata}
        contractdata={state.contractdata}
        submitter={state.contractdata.submitter}
        badges={this.getBadges(state.contractdata)}
        updatePermissions={() => this.editorFormDidChange()}
      />
    ) : (
      <Form
        ref={this.form}
        metadata={state.metadata}
        contractdata={state.contractdata}
        submitter={state.contractdata.submitter}
        badges={this.getBadges(state.contractdata)}
        updatePermissions={() => this.editorFormDidChange()}
      />
    );

    return (
      <div className="editform" id="editform">
        {form}
        <div className="button-aligner">
          <Tooltip
            title={
              !permissions.allowed ? "Can't submit: " + permissions.reason : ""
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
                disabled={!permissions.allowed}
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
          <Tooltip
            title={(this.state.curator ? 0 : this.state.price) + " Ξ"}
            classes={{
              tooltip: this.props.classes.lightTooltip,
              popper: this.props.classes.popper,
            }}
            enterDelay={200}
            leaveDelay={200}
          >
            <span>
              <Button variant="outlined" disabled size="small">
                {this.state.curator ? 0 : this.state.price} Ξ
              </Button>
            </span>
          </Tooltip>
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

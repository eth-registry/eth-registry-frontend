import React, { Component, PropTypes } from "react";
import Grid from "@material-ui/core/Grid";
import InputBase from "@material-ui/core/InputBase";
import InputAdornment from "@material-ui/core/InputAdornment";
import Edit from "@material-ui/icons/Edit";
import defaultsDeep from "lodash.defaultsdeep";
import isEqual from "lodash.isequal";

import FormComponent from "./FormComponent";
import LogoDrop from "./LogoDrop";
// import AddressBar from "./AddressBar"; //address bar plus all icons

// THE COMPONENT TO END ALL COMPONENTS
import Registry from "./Registry"; //single priority icon

import "../css/form.css";

class Form extends Component {
  //"scam" -- reported scam prio 1
  //"malicious" -- verified to be malicious by ETH registry
  //"verified" -- verified by curators of ETH registry
  //"self" -- info submitted by same address
  //"info" -- info available but not attested by same address
  //"locked" -- address info is locked from submissions for "reasons"
  //"unknown" -- dunno.. never heard of 'em

  state = {
    badges: [...this.props.badges],
    metadata: this.props.metadata,
    contractdata: this.props.contractdata,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.badges) {
      this.setState({ badges: nextProps.badges });
    }
  }

  populateForm(metadata, contractdata) {
    this.setState({ metadata: metadata, contractdata: contractdata });
  }

  handleChange = name => event => {
    if (event === undefined) return;
    const value = event.target ? event.target.value : event;
    const newState = {};
    const keyChain = name.split(".");
    let temp = {};
    keyChain.reverse().forEach((key, idx, arr) => {
      if (arr.length === 1) {
        newState[key] = value;
      } else {
        if (idx !== arr.length - 1) {
          if (idx === 0) {
            temp[key] = value;
          } else {
            let _temp = temp;
            temp = {};
            temp[key] = _temp;
          }
        } else {
          newState[key] = temp;
        }
      }
    });
    const state = defaultsDeep({ ...this.state, ...newState }, this.state);
    this.setState(state);
    this.props.updatePermissions();
  };

  render() {
    const { state } = this;
    const { badges, metadata, contractdata } = state;

    return (
      <div className="form">
        <Grid container>
          <Grid item xs={2}>
            <LogoDrop
              file={metadata.logo}
              onChange={this.handleChange("metadata.logo")}
            />
          </Grid>
          <Grid item xs={10}>
            <InputBase
              fullWidth
              value={metadata.name || ""}
              className="borderHover inputH2"
              placeholder="Name"
              onChange={this.handleChange("metadata.name")}
              startAdornment={
                <React.Fragment>
                  <InputAdornment position="start">
                    <Registry single icon type={badges} />
                  </InputAdornment>
                </React.Fragment>
              }
              endAdornment={
                <React.Fragment>
                  <InputAdornment position="end" className="badgeIcon action">
                    <Edit fontSize="inherit" />
                  </InputAdornment>
                </React.Fragment>
              }
            />
            <FormComponent
              value={metadata.url || ""}
              defaultValue="https://spankchain.com"
              type="url"
              placeholder={"Website"}
              onChange={this.handleChange("metadata.url")}
            />
            <FormComponent
              fullWidth
              multiline
              rowsMax="5"
              placeholder={"Description"}
              value={metadata.description || ""}
              defaultValue="SpankChain is a revolutionary blockchain based economic and technological infrastructure for the adult industry. Built on Ethereum, our smart contracts allow us to eliminate third party intermediaries and unfair payment practices while providing more powerful privacy and security."
              className="multilineHover"
              onChange={this.handleChange("metadata.description")}
            />
            <h2>
              Contact Information
              <hr />
            </h2>
            {Object.keys(metadata.contact).map(key => {
              return (
                <FormComponent
                  value={metadata.contact[key] || ""}
                  deletable
                  onDelete={() => {}}
                  label={key}
                  onChange={this.handleChange(`metadata.contact.${key}`)}
                />
              );
            })}
            <FormComponent
              value={metadata.email || ""}
              deletable
              onDelete={() => {}}
              label="testing"
              onChange={this.handleChange("metadata.contact.testing")}
            />

            <h2>
              Contract Details
              <hr />
            </h2>
            <p className="sectionDescription">
              Contract details allow users to validate and trust the source code
              of your contracts. If you are using Radspec this also enables you
              to use Human Readable Machine Verifyable transactions.
            </p>
            <FormComponent
              file={metadata.contract.abi}
              label="abi"
              upload
              value={metadata.contract.abi || ""}
              onDelete={() => {}}
              onUpload={this.handleChange("metadata.contract.abi")}
              accept="application/json"
            />
            <FormComponent
              label="source"
              upload
              file={metadata.contract.source}
              value={metadata.contract.source || ""}
              onDelete={() => {}}
              onUpload={this.handleChange("metadata.contract.source")}
              accept=".sol"
            />
            <FormComponent
              label="compiler"
              value={metadata.contract.compiler || ""}
              onChange={this.handleChange("metadata.contract.compiler")}
            />
            <FormComponent
              label="language"
              defaultValue="Solidity"
              value={metadata.contract.language || ""}
              onChange={this.handleChange("metadata.contract.language")}
            />
            <FormComponent
              label="optimizer"
              defaultValue="200"
              value={metadata.contract.optimizer || ""}
              onChange={this.handleChange("metadata.contract.optimizer")}
            />
            <FormComponent
              label="swarm"
              value={metadata.contract.swarm || ""}
              onChange={this.handleChange("metadata.contract.swarm")}
            />
            <FormComponent
              label="constructor"
              value={metadata.contract.constructor_arguments || ""}
              onChange={this.handleChange(
                "metadata.contract.constructor_arguments",
              )}
            />
            <h2>
              Reputation
              <hr />
            </h2>
            <p className="sectionDescription">
              Reputation is attributed by ETH Registry, malicious sites that are
              reported to us will be tagged as malicious upon further
              investigation. This allows wallets to better protect users from
              malicious actors and creates a way for good actors to distinguish
              themselves by providing transparency.
            </p>
            <div className="formbadges">
              <Registry type={badges} />
            </div>
            <FormComponent
              label="Status"
              className="reputation"
              value={
                badges.includes("malicious")
                  ? "Blocked"
                  : badges.includes("verified")
                    ? "Trusted"
                    : "Neutral"
              }
              disabled
              style={{
                color: badges.includes("malicious")
                  ? "#eb5757"
                  : badges.includes("verified")
                    ? "#27ae60"
                    : "#bdbdbd",
              }}
            />
            <FormComponent
              className="reputation"
              label="Curated by"
              value="Ethtective, WalletConnect"
              disabled
            />
            <FormComponent
              className="reputation"
              label="Description"
              value={contractdata.description}
              disabled
            />
            <FormComponent
              className="reputation inputmono"
              label="Submitted by"
              value={contractdata.submitter || ""}
              disabled
            />
          </Grid>
        </Grid>
        <div className="badges">
          <Registry single type={badges} />
        </div>
      </div>
    );
  }
}

export default Form;

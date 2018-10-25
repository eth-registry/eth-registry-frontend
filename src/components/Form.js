import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Input from "@material-ui/core/Input";
import InputBase from "@material-ui/core/InputBase";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import Delete from "@material-ui/icons/Delete";
import VerifiedUser from "@material-ui/icons/People";
// import VerifiedUser from "@material-ui/icons/HowToReg";
import SelfAttested from "@material-ui/icons/RecordVoiceOver";
import Lock from "@material-ui/icons/MicOff";
import Edit from "@material-ui/icons/Edit";
import Warning from "@material-ui/icons/Warning";
import FormComponent from "./FormComponent";
import LogoDrop from "./LogoDrop";
// custom icon/badge components
import AddressBar from "./AddressBar"; //address bar plus all icons

// THE COMPONENT TO END ALL COMPONENTS
import Registry from "./Registry"; //single priority icon

import "../css/form.css";

export default class Form extends Component {
  //"scam" -- reported scam prio 1
  //"verified" -- verified by curators of ETH registry
  //"self" -- info submitted by same address
  //"info" -- info available but not attested by same address
  //"locked" -- address info is locked from submissions for "reasons"
  //"unknown" -- dunno.. never heard of 'em

  state = {
    badges: ["info", "verified"],
    metadata: {},
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleUpload = name => file => {
    this.setState({
      [name]: file,
    });
  };

  render() {
    const { state, props } = this;
    const { badges, metadata } = this.props;

    return (
      <div className="form">
        <Grid container>
          <Grid item xs={2}>
            <LogoDrop file={state.logo || metadata.logo} />
          </Grid>
          <Grid item xs={10}>
            <InputBase
              fullWidth
              value={state.metadata.name || metadata.name}
              defaultValue={"SpankChain"}
              className="borderHover inputH2"
              placeholder="Name"
              onChange={this.handleChange("name")}
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
              value={state.metadata.url || metadata.url}
              defaultValue="https://spankchain.com"
              type="url"
              placeholder={"Website"}
              onChange={this.handleChange("url")}
            />
            <FormComponent
              fullWidth
              multiline
              rowsMax="5"
              placeholder={"Description"}
              value={state.metadata.description || metadata.description}
              defaultValue="SpankChain is a revolutionary blockchain based economic and technological infrastructure for the adult industry. Built on Ethereum, our smart contracts allow us to eliminate third party intermediaries and unfair payment practices while providing more powerful privacy and security."
              className="multilineHover"
              onChange={this.handleChange("description")}
            />
            <h2>
              Contact Information
              <Divider light />
            </h2>
            {Object.Keys(metadata).contact.map(key => {
              return (
                <FormComponent
                  value={metadata.contact[key]}
                  deletable
                  onDelete={() => {}}
                  label={key}
                  onChange={this.handleChange(key)}
                />
              );
            })}
            <h2>
              Contract Details
              <Divider light />
            </h2>
            <p className="sectionDescription">
              Contract details allow users to validate and trust the source code
              of your contracts. If you are using Radspec this also enables you
              to use Human Readable Machine Verifyable transactions.
            </p>
            <FormComponent
              file={state.abi || metadata.contract.abi}
              label="abi"
              upload
              value={state.abi || metadata.contract.abi}
              onDelete={() => {}}
              onUpload={this.handleUpload("contract.abi")}
              accept="text/plain"
            />
            <FormComponent
              label="source"
              upload
              file={state.source || metadata.contract.source}
              value={state.source || metadata.contract.source}
              onDelete={() => {}}
              onUpload={this.handleUpload("contractsource")}
              accept="text/plain"
            />
            <FormComponent
              label="compiler"
              value={state.compiler || metadata.contract.compiler}
              onChange={this.handleChange("contract.compiler")}
            />
            <FormComponent
              label="language"
              defaultValue="Solidity"
              value={state.language || metadata.contract.language}
              onChange={this.handleChange("contract.language")}
            />
            <FormComponent
              label="optimizer"
              defaultValue="200"
              value={state.optimizer || metadata.contract.optimizer}
              onChange={this.handleChange("contract.optimizer")}
            />
            <FormComponent
              label="swarm"
              value={state.swarm || metadata.contract.swarm}
              onChange={this.handleChange("contract.swarm")}
            />
            <FormComponent
              label="constructor"
              value={state.construct || metadata.contract.constructor_arguments}
              onChange={this.handleChange("contract.constructor_arguments")}
            />
            <h2>
              Reputation
              <Divider light />
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
              value="WalletConnect, Ethtective"
              disabled
            />
            <FormComponent
              className="reputation"
              label="Description"
              value="Submitted and curated, logo might be incorrect"
              disabled
            />
            <FormComponent
              className="reputation inputmono"
              label="Submitted by"
              value={state.submitter || props.submitter}
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

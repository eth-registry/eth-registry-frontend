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
    const { badges } = this.props;

    return (
      <div className="form">
        <Grid container>
          <Grid item xs={2}>
            <LogoDrop file={state.logo || props.logo} />
          </Grid>
          <Grid item xs={10}>
            <InputBase
              fullWidth
              value={state.name || props.name}
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
              value={state.url || props.url}
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
              value={state.description || props.description}
              defaultValue="SpankChain is a revolutionary blockchain based economic and technological infrastructure for the adult industry. Built on Ethereum, our smart contracts allow us to eliminate third party intermediaries and unfair payment practices while providing more powerful privacy and security."
              className="multilineHover"
              onChange={this.handleChange("description")}
            />
            <h2>
              Contact Information
              <Divider light />
            </h2>
            <FormComponent
              value={state.twitter || props.twitter}
              deletable
              onDelete={() => {}}
              label="twitter"
              onChange={this.handleChange("twitter")}
            />
            <FormComponent
              value={state.email || props.email}
              deletable
              onDelete={() => {}}
              label="Email"
              onChange={this.handleChange("email")}
            />
            <FormComponent
              value={state.phone || props.phone}
              deletable
              onDelete={() => {}}
              label="phone"
              onChange={this.handleChange("phone")}
            />
            <FormComponent
              value={state.github || props.github}
              deletable
              onDelete={() => {}}
              label="github"
              onChange={this.handleChange("github")}
            />
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
              file={state.abi || props.abi}
              label="abi"
              upload
              value={state.abi || props.abi}
              onDelete={() => {}}
              onUpload={this.handleUpload("abi")}
              accept="text/plain"
            />
            <FormComponent
              label="source"
              upload
              file={state.source || props.source}
              value={state.source || props.source}
              onDelete={() => {}}
              onUpload={this.handleUpload("source")}
              accept="text/plain"
            />
            <FormComponent
              label="compiler"
              value={state.compiler || props.compiler}
            />
            <FormComponent
              label="language"
              defaultValue="Solidity"
              value={state.language || props.language}
            />
            <FormComponent
              label="optimizer"
              defaultValue="200"
              value={state.optimizer || props.optimizer}
            />
            <FormComponent label="swarm" value={state.swarm || props.swarm} />
            <FormComponent
              label="constructor"
              value={state.construct || props.construct}
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
            <FormComponent className="reputation" label="Addresses" disabled />
          </Grid>
        </Grid>
        <div className="badges">
          <Registry single type={badges} />
        </div>
      </div>
    );
  }
}

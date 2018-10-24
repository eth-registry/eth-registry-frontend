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

  state = {
    badges: ["unknown"],
  };

  render() {
    return (
      <div className="form">
        <Grid container>
          <Grid item xs={2}>
            <LogoDrop />
          </Grid>
          <Grid item xs={10}>
            <Typography gutterBottom component="h2">
              <InputBase
                fullWidth
                defaultValue={"SpankChain"}
                className="borderHover inputH2"
                placeholder="Name"
                startAdornment={
                  <React.Fragment>
                    <InputAdornment position="start">
                      <Registry single icon type={this.state.badges} />
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
            </Typography>
            <FormComponent
              defaultValue="https://spankchain.com"
              type="url"
              placeholder={"Website"}
            />
            <FormComponent
              fullWidth
              multiline
              rows="5"
              rowsMax="5"
              placeholder={"Description"}
              defaultValue="SpankChain is a revolutionary blockchain based economic and technological infrastructure for the adult industry. Built on Ethereum, our smart contracts allow us to eliminate third party intermediaries and unfair payment practices while providing more powerful privacy and security."
              className="multilineHover"
            />
            <br />
            <Typography variant="h6" gutterBottom component="h2">
              Contact Information
              <Divider light />
            </Typography>
            <FormComponent
              value="@spankchain"
              deletable
              onDelete={() => {}}
              label="twitter"
            />
            <FormComponent
              value="info@spankchain.com"
              deletable
              onDelete={() => {}}
              label="Email"
            />
            <FormComponent
              value="+46 444 039 123"
              deletable
              onDelete={() => {}}
              label="phone"
            />
            <br />
            <br />
            <Typography variant="h6" gutterBottom component="h2">
              Contract Details
              <Divider light />
            </Typography>
            <FormComponent label="abi" upload />
            <FormComponent
              label="source"
              upload
              file={{ name: "sourcecode.sol" }}
              onDelete={() => {}}
            />
            <FormComponent label="compiler" />
            <FormComponent label="language" defaultValue="Solidity" />
            <FormComponent label="optimizer" defaultValue="200" />
            <FormComponent label="swarm" />
            <FormComponent label="constructor" />
            <br />
            <br />
            <Typography variant="h6" gutterBottom component="h2">
              Reputation
              <Divider light />
            </Typography>
            <div className="formbadges">
              <Registry type={this.state.badges} />
            </div>
            <FormComponent
              label="Status"
              placeholder="disabled"
              deletable
              disabled
              onDelete={() => {
                alert("delete");
              }}
            />
            <FormComponent
              label="Description"
              placeholder="placeholder"
              deletable
              onDelete={() => {
                alert("delete");
              }}
            />
            <FormComponent
              label="Addresses"
              placeholder="Related addresses (separated by comma)"
            />
          </Grid>
        </Grid>
        <div className="badges">
          <Registry single type={this.state.badges} />
        </div>
      </div>
    );
  }
}

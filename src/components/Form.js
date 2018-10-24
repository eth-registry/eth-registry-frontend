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
    badges: ["verified", "info", "locked", "self"],
  };

  render() {
    return (
      <div className="form">
        <Grid container spacing={11}>
          <Grid item xs={2}>
            <Avatar
              alt="Adelle Charles"
              src="unicorn.jpg"
              style={{
                width: 60,
                height: 60,
                borderRadius: 4,
                margin: "auto",
              }}
            />
          </Grid>
          <Grid item xs={10}>
            <Typography gutterBottom component="h2">
              <InputBase
                fullWidth
                value={"SpankChain"}
                className="borderHover inputH2"
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
            <Typography gutterBottom component="h4">
              <FormComponent defaultValue="https://spankchain.com" type="url" />
            </Typography>
            <Typography component="p">
              <FormComponent
                fullWidth
                multiline
                rows="5"
                rowsMax="5"
                value="SpankChain is a revolutionary blockchain based economic and technological infrastructure for the adult industry. Built on Ethereum, our smart contracts allow us to eliminate third party intermediaries and unfair payment practices while providing more powerful privacy and security."
                className="multilineHover"
              />
            </Typography>
            <br />
            <Typography variant="h6" gutterBottom component="h2">
              Contact Information
              <Divider light />
            </Typography>
            <Typography component="p">
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
            </Typography>
            <br />
            <br />
            <Typography variant="h6" gutterBottom component="h2">
              Contract Details
              <Divider light gutterBottom />
            </Typography>
            <FormComponent label="abi" upload />
            <FormComponent
              label="source"
              upload
              file={{ name: "sourcecode.sol" }}
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
            <Typography component="p">
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
            </Typography>
          </Grid>
        </Grid>
        <div className="badges">
          <Registry single type={this.state.badges} />
        </div>
      </div>
    );
  }
}

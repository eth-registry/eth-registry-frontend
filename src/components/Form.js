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

// custom icon/badge components
import AddressBar from "./AddressBar"; //address bar plus all icons
import ColoredIcon from "./ColoredIcon"; //registry icon
import RegistryIcon from "./RegistryIcon"; //single priority icon
import RegistryBadge from "./RegistryBadge"; //single priority icon

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
    badges: ["verified", "info", "locked"],
  };

  render() {
    return (
      <div className="form">
        <Grid container spacing={11}>
          <Grid item xs={2}>
            <Avatar
              alt="Adelle Charles"
              src="spankchain.png"
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
              <InputBase
                fullWidth
                value="https://spankchain.com"
                className="borderHover inputH4"
                endAdornment={
                  <InputAdornment position="end" className="action">
                    <Edit fontSize="inherit" />
                  </InputAdornment>
                }
              />
            </Typography>
            <Typography component="p">
              <InputBase
                fullWidth
                multiline
                rows="5"
                rowsMax="5"
                value="SpankChain is a revolutionary blockchain based economic and technological infrastructure for the adult industry. Built on Ethereum, our smart contracts allow us to eliminate third party intermediaries and unfair payment practices while providing more powerful privacy and security."
                className="multilineHover"
              />
            </Typography>
            <br />
            <br />
            <Typography variant="h6" gutterBottom component="h2">
              Contact Information
              <Divider light />
            </Typography>
            <Typography component="p">
              <InputBase
                fullWidth
                value="@spankchain"
                className="borderHover inputH4"
                endAdornment={
                  <React.Fragment>
                    <InputAdornment position="end" className="action">
                      <Edit fontSize="inherit" />
                    </InputAdornment>
                    <InputAdornment position="end" className="action">
                      <Delete fontSize="inherit" />
                    </InputAdornment>
                  </React.Fragment>
                }
                startAdornment={
                  <InputAdornment position="start" className="prefix">
                    Twitter:{" "}
                  </InputAdornment>
                }
              >
                a
              </InputBase>
              <InputBase
                fullWidth
                value="info@spankchain.com"
                className="borderHover inputH4"
                endAdornment={
                  <React.Fragment>
                    <InputAdornment position="end" className="action">
                      <Edit fontSize="inherit" />
                    </InputAdornment>
                    <InputAdornment position="end" className="action">
                      <Delete fontSize="inherit" />
                    </InputAdornment>
                  </React.Fragment>
                }
                startAdornment={
                  <InputAdornment position="start" className="prefix">
                    Email:{" "}
                  </InputAdornment>
                }
              />
            </Typography>
            <br />
            <br />
            <Typography variant="h6" gutterBottom component="h2">
              Contract Details
              <Divider light />
            </Typography>
            <Typography component="p">
              <InputBase
                fullWidth
                value=""
                className="borderHover inputH4"
                endAdornment={
                  <React.Fragment>
                    <InputAdornment position="end" className="action">
                      <Edit fontSize="inherit" />
                    </InputAdornment>
                    <InputAdornment position="end" className="action">
                      <Delete fontSize="inherit" />
                    </InputAdornment>
                  </React.Fragment>
                }
                startAdornment={
                  <InputAdornment position="start" className="prefix">
                    abi:{" "}
                  </InputAdornment>
                }
              >
                a
              </InputBase>
              <InputBase
                fullWidth
                value=""
                className="borderHover inputH4"
                endAdornment={
                  <React.Fragment>
                    <InputAdornment position="end" className="action">
                      <Edit fontSize="inherit" />
                    </InputAdornment>
                    <InputAdornment position="end" className="action">
                      <Delete fontSize="inherit" />
                    </InputAdornment>
                  </React.Fragment>
                }
                startAdornment={
                  <InputAdornment position="start" className="prefix">
                    source:{" "}
                  </InputAdornment>
                }
              />
              <InputBase
                fullWidth
                value=""
                className="borderHover inputH4"
                endAdornment={
                  <React.Fragment>
                    <InputAdornment position="end" className="action">
                      <Edit fontSize="inherit" />
                    </InputAdornment>
                    <InputAdornment position="end" className="action">
                      <Delete fontSize="inherit" />
                    </InputAdornment>
                  </React.Fragment>
                }
                startAdornment={
                  <InputAdornment position="start" className="prefix">
                    compiler:{" "}
                  </InputAdornment>
                }
              />
              <InputBase
                fullWidth
                value=""
                className="borderHover inputH4"
                endAdornment={
                  <React.Fragment>
                    <InputAdornment position="end" className="action">
                      <Edit fontSize="inherit" />
                    </InputAdornment>
                    <InputAdornment position="end" className="action">
                      <Delete fontSize="inherit" />
                    </InputAdornment>
                  </React.Fragment>
                }
                startAdornment={
                  <InputAdornment position="start" className="prefix">
                    language:{" "}
                  </InputAdornment>
                }
              />
              <InputBase
                fullWidth
                value=""
                className="borderHover inputH4"
                endAdornment={
                  <React.Fragment>
                    <InputAdornment position="end" className="action">
                      <Edit fontSize="inherit" />
                    </InputAdornment>
                    <InputAdornment position="end" className="action">
                      <Delete fontSize="inherit" />
                    </InputAdornment>
                  </React.Fragment>
                }
                startAdornment={
                  <InputAdornment position="start" className="prefix">
                    optimizer:{" "}
                  </InputAdornment>
                }
              />
            </Typography>
            <br />
            <br />
            <Typography variant="h6" gutterBottom component="h2">
              Reputation
              <Divider light />
            </Typography>
            <Typography component="p">
              <InputBase
                fullWidth
                value="@spankchain"
                className="borderHover inputH4"
                endAdornment={
                  <React.Fragment>
                    <InputAdornment position="end" className="action">
                      <Edit fontSize="inherit" />
                    </InputAdornment>
                    <InputAdornment position="end" className="action">
                      <Delete fontSize="inherit" />
                    </InputAdornment>
                  </React.Fragment>
                }
                startAdornment={
                  <InputAdornment position="start" className="prefix">
                    Twitter:{" "}
                  </InputAdornment>
                }
              >
                a
              </InputBase>
              <InputBase
                fullWidth
                value=""
                className="borderHover inputH4"
                endAdornment={
                  <React.Fragment>
                    <InputAdornment position="end" className="action">
                      <Edit fontSize="inherit" />
                    </InputAdornment>
                    <InputAdornment position="end" className="action">
                      <Delete fontSize="inherit" />
                    </InputAdornment>
                  </React.Fragment>
                }
                startAdornment={
                  <InputAdornment position="start" className="prefix">
                    Email:{" "}
                  </InputAdornment>
                }
              />
            </Typography>
          </Grid>
        </Grid>
        <div className="badges">
          <Registry type={this.state.badges} />
        </div>
      </div>
    );
  }
}

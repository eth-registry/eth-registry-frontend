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
import "../css/form.css";

class Badge extends Component {}

export default class Form extends Component {
  state = {
    badges: ["verified", "scam", "locked", "self"],
  };

  renderIcon(type) {
    switch (type) {
      case "verified":
        return (
          <span className="badgeIcon verified">
            <VerifiedUser />
          </span>
        );
      case "scam":
        return (
          <span className="badgeIcon scam">
            <Warning />
          </span>
        );
      case "self":
        return (
          <span className="badgeIcon selfAttested">
            <SelfAttested />
          </span>
        );
      case "locked":
        return (
          <span className="badgeIcon curated">
            <Lock />
          </span>
        );
    }
  }

  renderBadge(type) {
    switch (type) {
      case "scam":
        return (
          <div className="badge scam">
            Malicious <Warning />
          </div>
        );
      case "locked":
        return (
          <div className="badge curated">
            Locked <Lock />
          </div>
        );
      case "self":
        return (
          <div className="badge selfAttested">
            Self Attested <SelfAttested />
          </div>
        );
      case "verified":
        return (
          <div className="badge verified">
            Verified <VerifiedUser />
          </div>
        );
    }
  }

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
                startAdornment={<React.Fragment />}
                endAdornment={
                  <React.Fragment>
                    <InputAdornment position="end" className="badgeIcon action">
                      <Edit fontSize="inherit" />
                    </InputAdornment>
                  </React.Fragment>
                }
              />
            </Typography>

            <div class="monospace address">
              <div class="barBadges">
                {this.state.badges.map(key => {
                  return this.renderIcon(key);
                })}
              </div>
              <div class="barAddress">
                0x03236093522cdCBaC662ffBebD6a951349082b72
              </div>
            </div>
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
          </Grid>
        </Grid>
        <div className="badges">
          {this.state.badges.map(key => {
            return this.renderBadge(key);
          })}
        </div>
      </div>
    );
  }
}

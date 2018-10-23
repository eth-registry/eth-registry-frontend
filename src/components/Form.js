import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Input from "@material-ui/core/Input";
import InputBase from "@material-ui/core/InputBase";
import InputAdornment from "@material-ui/core/InputAdornment";
import Divider from "@material-ui/core/Divider";
import "../css/form.css";

export default class Form extends Component {
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
                value="SpankChain"
                className="borderHover inputH2"
                endAdornment={
                  <InputAdornment position="end">edit</InputAdornment>
                }
              />
            </Typography>

            <div class="monospace address">
              0x03236093522cdCBaC662ffBebD6a951349082b72
            </div>
            <Typography gutterBottom component="h4">
              <InputBase
                fullWidth
                value="https://spankchain.com"
                className="borderHover inputH4"
                endAdornment={
                  <InputAdornment position="end">edit</InputAdornment>
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
                    <InputAdornment position="end">edit</InputAdornment>
                    <InputAdornment position="end">remove</InputAdornment>
                  </React.Fragment>
                }
                startAdornment={
                  <InputAdornment position="start">Twitter: </InputAdornment>
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
                    <InputAdornment position="end">edit</InputAdornment>
                    <InputAdornment position="end">remove</InputAdornment>
                  </React.Fragment>
                }
                startAdornment={
                  <InputAdornment position="start">Email: </InputAdornment>
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
                    <InputAdornment position="end">edit</InputAdornment>
                    <InputAdornment position="end">remove</InputAdornment>
                  </React.Fragment>
                }
                startAdornment={
                  <InputAdornment position="start">Twitter: </InputAdornment>
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
                    <InputAdornment position="end">edit</InputAdornment>
                    <InputAdornment position="end">remove</InputAdornment>
                  </React.Fragment>
                }
                startAdornment={
                  <InputAdornment position="start">Email: </InputAdornment>
                }
              />
            </Typography>
          </Grid>
        </Grid>
      </div>
    );
  }
}

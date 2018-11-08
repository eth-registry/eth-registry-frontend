import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import defaultsDeep from "lodash.defaultsdeep";

import FormComponent from "./FormComponent";
// import AddressBar from "./AddressBar"; //address bar plus all icons

// THE COMPONENT TO END ALL COMPONENTS
// import Registry from "./Registry"; //single priority icon

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
    console.log(metadata);
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

  //   <FormComponent
  //   value={metadata.email || ""}
  //   deletable
  //   onDelete={() => {}}
  //   label="testing"
  //   onChange={this.handleChange("metadata.contact.testing")}
  // />

  render() {
    const { state } = this;
    const { badges, contractdata } = state;

    return (
      <React.Fragment>
        <h2 className="logo">Report a malicious address</h2>
        <p className="capital" id="addressInput">
          ETH Registry enables you to report addresses you consider malicious.
          Please use the form below to report a malicious address to us and we
          will review your submission.
        </p>
        <div className="form">
          <Grid container>
            <Grid item xs={12}>
              <h2>
                Address report
                <hr />
              </h2>
              <p className="sectionDescription">
                Please describe below why you consider this address malicious.
                Keep in mind that your report is being saved to the Ethereum
                blockchain and can be read by everyone.{" "}
                <b style={{ fontWeight: 700, color: "rgb(255, 48, 27)" }}>
                  We strongly suggest you do not post information that
                  identifies you personally.
                </b>
              </p>
              <FormComponent
                fullWidth
                multiline
                rowsMax="5"
                placeholder={"Description"}
                value={""}
                defaultValue="SpankChain is a revolutionary blockchain based economic and technological infrastructure for the adult industry. Built on Ethereum, our smart contracts allow us to eliminate third party intermediaries and unfair payment practices while providing more powerful privacy and security."
                className="multilineHover"
                onChange={this.handleChange("metadata.description")}
              />
              <h2>
                Current Reputation
                <hr />
              </h2>
              <p className="sectionDescription">
                Reputation is attributed by ETH Registry, malicious sites that
                are reported to us will be tagged as malicious upon further
                investigation. This allows wallets to better protect users from
                malicious actors and creates a way for good actors to
                distinguish themselves by providing transparency.
              </p>
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
        </div>
      </React.Fragment>
    );
  }
}

export default Form;

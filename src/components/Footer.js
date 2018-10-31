import React from "react";
import Grid from "@material-ui/core/Grid";
import SvgIcon from "@material-ui/core/SvgIcon";
import Recent from "./recent";
import LogoBanner from "../assets/logo_banner_white.png";
import "../css/footer.css";

const github = (
  <svg version="1.1" width="24" height="24" viewBox="0 0 24 24">
    <path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" />
  </svg>
);
const discord = (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path d="M22,24L16.75,19L17.38,21H4.5A2.5,2.5 0 0,1 2,18.5V3.5A2.5,2.5 0 0,1 4.5,1H19.5A2.5,2.5 0 0,1 22,3.5V24M12,6.8C9.32,6.8 7.44,7.95 7.44,7.95C8.47,7.03 10.27,6.5 10.27,6.5L10.1,6.33C8.41,6.36 6.88,7.53 6.88,7.53C5.16,11.12 5.27,14.22 5.27,14.22C6.67,16.03 8.75,15.9 8.75,15.9L9.46,15C8.21,14.73 7.42,13.62 7.42,13.62C7.42,13.62 9.3,14.9 12,14.9C14.7,14.9 16.58,13.62 16.58,13.62C16.58,13.62 15.79,14.73 14.54,15L15.25,15.9C15.25,15.9 17.33,16.03 18.73,14.22C18.73,14.22 18.84,11.12 17.12,7.53C17.12,7.53 15.59,6.36 13.9,6.33L13.73,6.5C13.73,6.5 15.53,7.03 16.56,7.95C16.56,7.95 14.68,6.8 12,6.8M9.93,10.59C10.58,10.59 11.11,11.16 11.1,11.86C11.1,12.55 10.58,13.13 9.93,13.13C9.29,13.13 8.77,12.55 8.77,11.86C8.77,11.16 9.28,10.59 9.93,10.59M14.1,10.59C14.75,10.59 15.27,11.16 15.27,11.86C15.27,12.55 14.75,13.13 14.1,13.13C13.46,13.13 12.94,12.55 12.94,11.86C12.94,11.16 13.45,10.59 14.1,10.59Z" />
  </svg>
);
const twitter = (
  <svg version="1.1" width="24" height="24" viewBox="0 0 24 24">
    <path d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z" />
  </svg>
);
const reddit = (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path d="M22,11.5C22,10.1 20.9,9 19.5,9C18.9,9 18.3,9.2 17.9,9.6C16.4,8.7 14.6,8.1 12.5,8L13.6,4L17,5A2,2 0 0,0 19,7A2,2 0 0,0 21,5A2,2 0 0,0 19,3C18.3,3 17.6,3.4 17.3,4L13.3,3C13,2.9 12.8,3.1 12.7,3.4L11.5,8C9.5,8.1 7.6,8.7 6.1,9.6C5.7,9.2 5.1,9 4.5,9C3.1,9 2,10.1 2,11.5C2,12.4 2.4,13.1 3.1,13.6L3,14.5C3,18.1 7,21 12,21C17,21 21,18.1 21,14.5L20.9,13.6C21.6,13.1 22,12.4 22,11.5M9,11.8C9.7,11.8 10.2,12.4 10.2,13C10.2,13.6 9.7,14.2 9,14.2C8.3,14.2 7.8,13.7 7.8,13C7.8,12.3 8.3,11.8 9,11.8M15.8,17.2C14,18.3 10,18.3 8.2,17.2C8,17 7.9,16.7 8.1,16.5C8.3,16.3 8.6,16.2 8.8,16.4C10,17.3 14,17.3 15.2,16.4C15.4,16.2 15.7,16.3 15.9,16.5C16.1,16.7 16,17 15.8,17.2M15,14.2C14.3,14.2 13.8,13.6 13.8,13C13.8,12.3 14.4,11.8 15,11.8C15.7,11.8 16.2,12.4 16.2,13C16.2,13.7 15.7,14.2 15,14.2Z" />
  </svg>
);

class FooterPage extends React.Component {
  render() {
    const { metadata } = this.props;
    return (
      <footer className="font-small pt-4 mt-4" style={{ flexGrow: 1 }}>
        <Grid container spacing={16}>
          <Grid item xs={2} sm={0} />
          <Grid item xs={3} sm={3}>
            <h2>Recent Submissions</h2>
            <Recent metadata={metadata} />
          </Grid>
          <Grid item xs={3} sm={3} style={{ marginRight: "3rem" }}>
            <h2>Resources</h2>
            <b>Metadata Contract:</b>{" "}
            <p>
              <code>
                <a
                  href={
                    "https://www.ethtective.com/" + metadata.contractAddress
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {metadata.contractAddress}
                </a>
              </code>
            </p>
            <b>NPM Package: </b>{" "}
            <p>
              <a href="http://www.github.com/eth-registry">
                http://www.github.com/eth-registry
              </a>
            </p>
            <b>EIP 1456 (Address Metadata JSON Specification): </b>{" "}
            <p>
              <a href="https://ethereum-magicians.org/t/erc-1456-address-metadata-json-schema/">
                Discussion link
              </a>
            </p>
            <p>
              The metadata stored in this contract is retrieved by calling{" "}
              <code>.getByAddress(address)</code> on the contract. If metadata
              is available, JSON can be retrieved by looking up the IPFS
              address. This function returns the following tuple: <br />
              <code style={{ fontSize: 12 }}>
                (<span style={{ color: "#DA4C8A" }}>address</span> address,{" "}
                <span style={{ color: "#DA4C8A" }}>string</span> name,{" "}
                <span style={{ color: "#DA4C8A" }}>string</span> ipfsHash,{" "}
                <span style={{ color: "#DA4C8A" }}>bool</span> isSelfAttested,{" "}
                <span style={{ color: "#DA4C8A" }}>bool</span> isCurated,{" "}
                <span style={{ color: "#DA4C8A" }}>address</span> submittedBy)
              </code>
            </p>
          </Grid>
          <Grid item xs={2} sm={3}>
            <img src={LogoBanner} alt="logo" className="logo" />
            <p className="disclaimer">
              ETH Registry is an open-source tool for storing metadata on the
              Ethereum blockchain, reporting malicious websites and safeguarding
              users from malicious actors. We're officially maintained, curated
              and supported by{" "}
              <a href="https://walletconnect.org/" className="supported">
                WalletConnect
              </a>
              ,{" "}
              <a href="https://walleth.org/" className="supported">
                WALLΞTH
              </a>{" "}
              and{" "}
              <a href="https://ethtective.com" className="supported">
                Ethtective
              </a>
            </p>
            <h2>Contact</h2>
            <p>
              <a href="https://discord.gg/ZtfGyKZ" className="social">
                <SvgIcon>{discord}</SvgIcon>
              </a>
              <a href="https://twitter.com/ethregistry" className="social">
                <SvgIcon>{twitter}</SvgIcon>
              </a>
              <a href="https://github.com/eth-registry" className="social">
                <SvgIcon>{github}</SvgIcon>
              </a>
              <a href="https://reddit.com/ethregistry" className="social">
                <SvgIcon>{reddit}</SvgIcon>
              </a>
            </p>
            <p className="copyright">© 2018 Eth Registry</p>
          </Grid>
          <Grid item xs={2} sm={0} />
        </Grid>
      </footer>
    );
  }
}

export default FooterPage;

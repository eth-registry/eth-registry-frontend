import React from "react";
import metadata from "../js/metadata.js";
import { withStyles } from "@material-ui/core/styles";
import Editor from "./editor";
import Recent from "./recent";
import TextField from "@material-ui/core/TextField";
import LoadingIndicator from "./loadingIndicator";
import Button from "@material-ui/core/Button";
import LogoBanner from "../assets/logo_banner.png";

let metaData = {};

const styles = theme => ({
  popper: {
    opacity: 1
  },
  lightTooltip: {
    background: "#fefefe",
    color: theme.palette.text.primary,
    boxShadow:
      "0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 3px 2px 0px rgba(0, 0, 0, 0.01), 0px 3px 1px -2px rgba(0, 0, 0, 0.01)",
    fontFamily: "Hack, Source Code Pro",
    fontSize: 9,
    opacity: 1
  }
});

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: this.props.address || "",
      metadata: {},
      price: 0,
      network: 3,
      addressType: "Unstoppable",
      tokens: "",
      saveName: "",
      saveUrl: "",
      saveDescription: "",
      editAddress: "",
      saveScam: false,
      saveImageData: "",
      saveSymbol: "",
      saveDecimals: 18,
      saveInterfaces: [],
      isToken: false,
      isContract: false
    };
  }

  componentWillMount() {
    metaData = new metadata();
    this.setState({ metadata: metaData });
    metaData.getPrice().then(result => {
      // console.log(result);
      this.setState({ price: result });
    });
    if (this.props.params && this.props.params.address) {
      //we're matching edit params

      let match = this.props.params.address;
      this.setState({ editAddress: match });
    } else {
      this.setState({ editAddress: "" });
    }
  }

  componentDidMount() {}

  saveProperty = prop => event => {
    this.setState({
      [prop]: event.target.value
        ? event.target.value
        : event.target.checked
          ? event.target.checked
          : ""
    });
  };

  setType = contractdata => {
    let type = "Unstoppable";
    if (!contractdata) {
      this.setState({ addressType: type });
      return;
    }
    if (contractdata.curated) type = "Curated";
    if (contractdata.self_attested) type = "Self Attested";
    this.setState({ addressType: type });
  };

  ethtective = () => {
    // console.error("wut");
    window.open(
      "https://canary.ethtective.com/" + this.state.editAddress,
      "_blank"
    );
  };

  etherscan = () => {
    // console.error("wut");
    window.open(
      "https://ropsten.etherscan.io/address/" + this.state.editAddress,
      "_blank"
    );
  };

  render() {
    return (
      <div className="markdown">
        <img src={LogoBanner} alt="logo" />
        <h3>Ethereum Metadata Directory</h3>
        <h2 className="logo">
          Submit <i>{this.state.addressType}</i> Metadata
        </h2>
        <p className="capital" id="addressInput">
          ETH Registry stores information you submit about an Ethereum address
          on the blockchain and IPFS to make it{" "}
          <b>openly accessible to users, wallets and apps</b> without having to
          go through third parties that lock your data behind APIs. We wish to
          provide the Ethereum ecosystem with an easy way to add, edit and
          access information such as logo, url, token information or scam type
          to the Ethereum blockchain. The current version of this contract is{" "}
          <b>deployed on Mainnet</b>.
        </p>
        <form noValidate autoComplete="off" className="form">
          <TextField
            fullWidth
            error={
              !metaData.isValidAddress(this.state.editAddress) &&
              this.state.editAddress.length > 0
            }
            required={true}
            label="Address"
            value={this.state.editAddress}
            onChange={this.saveProperty("editAddress")}
            className="top-padding monofont addressbar"
            InputProps={{
              endAdornment: <LoadingIndicator />
            }}
            helperText={
              !metaData.isValidAddress(this.state.editAddress) &&
              this.state.editAddress.length >= 42
                ? "The address is not a valid Ethereum address"
                : ""
            }
          />
        </form>
        <div className="button-aligner">
          <Button
            size="small"
            variant="contained"
            onClick={this.etherscan}
            className="button"
            // onClick={this.view}
          >
            View on Etherscan
          </Button>
          <Button
            size="small"
            variant="contained"
            onClick={this.ethtective}
            // onClick={this.view}
          >
            View on Ethtective
          </Button>
        </div>
        <Editor
          address={this.state.editAddress}
          setType={this.setType}
          metadata={this.state.metadata}
        />
        <h2>Further Reading</h2>
        <p>
          <span role="img" aria-label="info">
            ☕
          </span>{" "}
          Check out the following examples:{" "}
          <a href="https://ethregistry.org/edit/0x6090a6e47849629b7245dfa1ca21d94cd15878ef">
            Ethereum Name Service
          </a>
          ,{" "}
          <a href="https://ethregistry.org/edit/0x42d6622dece394b54999fbd73d108123806f6a18">
            Spankchain
          </a>
          ,{" "}
          <a href="https://ethregistry.org/edit/0x267be1c1d684f78cb4f6a176c4911b741e4ffdc0">
            Kraken
          </a>
        </p>
        <p>
          <span role="img" aria-label="ethtective">
            🕵️
          </span>{" "}
          Metadata Prototype Contract:{" "}
          <a
            href={"http://canary.ethtective.com/" + metaData.contractAddress}
            target="_blank"
          >
            <code>{metaData.contractAddress}</code>
          </a>
        </p>
        <p>
          <span role="img" aria-label="info">
            🈺
          </span>{" "}
          The metadata stored in this contract is retrieved by calling{" "}
          <code>.getByAddress(address)</code> on the contract. If metadata is
          available, JSON can be retrieved by looking up the IPFS address. This
          function returns the following tuple: <br />
          <code style={{ fontSize: 10 }}>
            (<span style={{ color: "orange" }}>address</span> address,{" "}
            <span style={{ color: "orange" }}>string</span> name,{" "}
            <span style={{ color: "orange" }}>string</span> ipfsHash,{" "}
            <span style={{ color: "orange" }}>bool</span> isSelfAttested,{" "}
            <span style={{ color: "orange" }}>bool</span> isCurated,{" "}
            <span style={{ color: "orange" }}>address</span> submittedBy)
          </code>
        </p>
        <p>
          <span role="img" aria-label="info">
            🤖
          </span>{" "}
          The current iteration of this contract prioritizes self-attested data
          (submitted by the address itself) over data submitted by other
          addresses. This website is a sample implementation for interfacing
          with the contract.
        </p>
        <h2>Recent Submissions</h2>
        <Recent metadata={this.state.metadata} />
      </div>
    );
  }
}

export default withStyles(styles)(Index);

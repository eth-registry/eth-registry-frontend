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
    opacity: 1,
  },
  lightTooltip: {
    background: "#fefefe",
    color: theme.palette.text.primary,
    boxShadow:
      "0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 3px 2px 0px rgba(0, 0, 0, 0.01), 0px 3px 1px -2px rgba(0, 0, 0, 0.01)",
    fontFamily: "Hack, monospace",
    fontSize: 9,
    opacity: 1,
  },
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
      isContract: false,
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
          : "",
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
      "_blank",
    );
  };

  etherscan = () => {
    // console.error("wut");
    window.open(
      "https://ropsten.etherscan.io/address/" + this.state.editAddress,
      "_blank",
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
          ETH Registry stores information you submit about an address to make it{" "}
          <b>readily accessible to users, wallets and apps</b> without having to
          go through third parties that lock your data in API silos. Add, edit
          and access information such as logo, url, token details, or use the
          Registry to report a scam. All the information can be accessed though
          the Ethereum blockchain and IPFS.
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
              endAdornment: <LoadingIndicator />,
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
            color="secondary"
            onClick={this.etherscan}
            className="button"
            elevation={0}
            style={{ boxShadow: "none", padding: "12px 24px 12px 24px" }}
            // onClick={this.view}
          >
            View on Etherscan
          </Button>
          <Button
            size="small"
            color="secondary"
            variant="contained"
            onClick={this.ethtective}
            elevation={0}
            style={{ boxShadow: "none", padding: "12px 24px 12px 24px" }}
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
        <h2>Recent Submissions</h2>
        <Recent metadata={this.state.metadata} />

        <h2>Further Reading</h2>
        <p>
          <b>Metadata Contract:</b>{" "}
          <a
            href={"http://canary.ethtective.com/" + metaData.contractAddress}
            target="_blank"
            rel="noopener noreferrer"
          >
            <code>{metaData.contractAddress}</code>
          </a>
        </p>
        <p>
          <b>NPM Package: </b>{" "}
          <a href="http://www.github.com/eth-registry">
            http://www.github.com/eth-registry
          </a>
        </p>
        <p>
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
      </div>
    );
  }
}

export default withStyles(styles)(Index);

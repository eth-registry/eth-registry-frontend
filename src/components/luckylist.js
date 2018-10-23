import React from "react";
import Lucky from "../js/luckylist";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "../index.css";

let luckyList;

export default class LuckyList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      price: 0,
      saveLuckyAddress: ""
    };
  }

  handleSaveChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  onSubmit = async e => {
    luckyList.addLucky(this.state.saveLuckyAddress);
  };

  componentWillMount() {
    luckyList = new Lucky();
    luckyList.getPrice().then(response => {
      this.setState({ price: response });
    });
  }

  componentDidMount() {
    luckyList.getCurrentAccount().then(response => {
      // console.log(response);
      this.setState({ saveLuckyAddress: response });
      this.forceUpdate();
    });
    this.forceUpdate();
  }

  render() {
    return (
      <div>
        <h1>Lucky List</h1>
        <p>
          <span role="img" aria-label="cheer">
            🎊
          </span>{" "}
          Have you always wanted to be part of a select lucky few? Now is your
          chance for a mere {this.state.price} Eth! The Ξthtective Lucky List is
          open for submissions! Add an address of your choice that users will
          discover when they press "I'm Feeling Lucky".
        </p>
        <img src="lucky.png" alt="Ethtective search" />

        <form noValidate autoComplete="off">
          <TextField
            fullWidth
            error={
              this.state.saveLuckyAddress !== "" &&
              this.state.saveLuckyAddress.length > 0 &&
              !luckyList.isValidAddress(this.state.saveLuckyAddress)
            }
            required={true}
            label="Address"
            value={this.state.saveLuckyAddress}
            onChange={this.handleSaveChange("saveLuckyAddress")}
            className="top-padding monofont"
          />
          <div className="button-aligner">
            <Button
              disabled={!luckyList.isValidAddress(this.state.saveLuckyAddress)}
              size="small"
              variant="contained"
              onClick={this.onSubmit}
              className="button"
            >
              Add to Lucky List
            </Button>
            <Button variant="outlined" disabled size="small">
              {this.state.price} Ξ
            </Button>
          </div>
        </form>
        <br />
        <br />
        <br />
      </div>
    );
  }
}

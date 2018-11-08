import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import EmptyAvatar from "../assets/empty_avatar.png";
import "../css/menu.css";

export default class AccountManager extends Component {
  state = {
    anchorEl: null,
  };

  componentWillMount() {
    if (
      typeof window.web3 !== "undefined" &&
      typeof window.web3.currentProvider !== "undefined"
    ) {
      this.setState({ web3Provider: window.web3.currentProvider }, () =>
        this.getProfile(),
      );
    }
  }

  getProfile = async () => {
    console.log(this);
    if (window.web3) console.log("getting");
    const address = window.web3.eth.accounts[0];
    console.log(address);
    this.setState({ name: address });
    let profile = await this.props.ethregistry.getAddressData(address);
    if (profile && profile.data) {
      console.log(profile);
      this.setState({
        profile: profile.data.metadata,
        name: profile.data.metadata.name,
        avatar: profile.data.metadata.logo,
      });
    }

    try {
    } catch (e) {}
  };

  handleClick = event => {
    event.preventDefault();
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    return (
      <a
        href="/"
        className="HeaderNavlink px-2 Account"
        data-hotkey="g n"
        aria-owns={anchorEl ? "simple-menu" : null}
        aria-haspopup="true"
        onClick={this.handleClick}
      >
        <ul
          className="user-nav d-flex flex-items-center list-style-none"
          id="user-links"
        >
          <li className={"name" + (this.state.profile ? " registered" : "")}>
            {this.state.name}
          </li>
          <li>
            <Avatar
              src={this.state.avatar || EmptyAvatar}
              style={{
                width: 32,
                height: 32,
                // border: "4px solid black",
              }}
            />
          </li>
        </ul>
      </a>
    );
  }
}

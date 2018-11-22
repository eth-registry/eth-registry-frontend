import React, { Component, Fragment } from "react";
import Avatar from "@material-ui/core/Avatar";
import EmptyAvatar from "../assets/empty_avatar.png";
import WalletSelector from "../components/WalletSelector";
import { getMetamaskAccounts } from "../js/metamask";
import "../css/menu.css";

export default class AccountManager extends Component {
  state = {
    web3Provider: null,
    name: "",
    anchorEl: null,
    showWallets: false,
  };

  getProfile = async accounts => {
    const address = accounts[0];
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
    this.setState({
      anchorEl: event.currentTarget,
      showWallets: !this.state.showWallets,
    });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  onMetamask = () =>
    getMetamaskAccounts(accounts => {
      this.setState({ web3Provider: window.web3.currentProvider }, () =>
        this.getProfile(accounts),
      );
    });

  onWalletConnect = () => {};

  onSelectWallet = selectedWallet => {
    this.setState({ showWallets: false });
    console.log(selectedWallet);

    switch (selectedWallet) {
      case "Metamask":
        return this.onMetamask();
      case "WalletConnect":
        return this.onWalletConnect();
      default:
        return this.onMetamask();
    }
  };

  render() {
    const { anchorEl } = this.state;
    return (
      <Fragment>
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
              {this.state.name || "Connect Wallet"}
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
        <WalletSelector
          show={this.state.showWallets}
          callback={this.onSelectWallet}
        />
      </Fragment>
    );
  }
}

import React, { Component, Fragment } from "react";
import metamaskLogo from "../assets/metamask.png";
import walletConnectLogo from "../assets/walletconnect.png";

const walletOptions = [
  {
    name: "Metamask",
    logo: metamaskLogo,
  },
  {
    name: "WalletConnect",
    logo: walletConnectLogo,
  },
];

class WalletSelector extends Component {
  render() {
    return (
      <div
        className={`wallet-selector-popup ${
          this.props.show ? `show-modal` : `hide-modal`
        }`}
      >
        {walletOptions.map((wallet, idx, arr) => (
          <Fragment key={wallet.name}>
            <div
              className="wallet-selector-option"
              onClick={() => this.props.callback(wallet.name)}
            >
              <img src={wallet.logo} alt={wallet.name} />
              <div>{wallet.name}</div>
            </div>
            {idx !== arr.length - 1 && (
              <div className="wallet-selector-separator" />
            )}
          </Fragment>
        ))}
      </div>
    );
  }
}

export default WalletSelector;

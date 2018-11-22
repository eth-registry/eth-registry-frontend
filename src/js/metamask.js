export function getMetamaskAccounts(callback) {
  if (window.ethereum) {
    window.ethereum
      .enable()
      .then(accounts => {
        callback(accounts);
      })
      .catch(error => {
        callback(null, error);
      });
  } else if (
    typeof window.web3 !== "undefined" &&
    typeof window.web3.currentProvider !== "undefined"
  ) {
    const accounts = window.web3.eth.accounts;
    callback(accounts);
  } else {
    const error = new Error(
      "Metamask is not installed. Please install Metamask first",
    );
    callback(null, error);
  }
}

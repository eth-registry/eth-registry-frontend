export function getMetamaskAccounts(callback) {
  if (
    typeof window.web3 !== "undefined" &&
    typeof window.web3.currentProvider !== "undefined"
  ) {
    const accounts = window.web3.eth.accounts;
    callback(accounts);
  } else if (window.ethereum) {
    window.ethereum
      .enable()
      .then(accounts => {
        callback(accounts);
      })
      .catch(error => {
        console.error(error);
      });
  }
}

import Eth from "ethjs";
import abi from "../abi/metadata.json";
import IPFS from "ipfs-mini";
import axios from "axios";
import { getMetamaskAccounts } from "../js/metamask";

const network = "mainnet";

let reader = {};
const eth = new Eth(
  new Eth.HttpProvider(
    `https://${network}.infura.io/v3/${process.env.REACT_APP_INFURA_API ||
      "414438eb69d7469483421969becd7f66"}`,
  ),
);
const ethRead = new Eth(
  new Eth.HttpProvider(
    `https://${network}.infura.io/v3/${process.env.REACT_APP_INFURA_API ||
      "414438eb69d7469483421969becd7f66"}`,
  ),
);

let json = {
  version: "0.2",
  address: "",
  submission: {
    comments: "",
    ipfs: [],
  },
  metadata: {
    name: "",
    url: "",
    ens: "",
    logo: "",
    description: "",
    contact: [],
    contract: {
      name: "",
      abi: "",
      source: "",
      compiler: "", //0.4.24+commit.e67f0147
      language: "", //Solidity
      optimizer: -1, //200
      swarm: "",
      constructor_arguments: "",
      interfaces: [],
      erc: [],
    },
    token: {
      ticker: "",
      decimals: 18,
    },
    reputation: {
      verified: [],
      status: "",
      category: "",
      subcategory: "",
      description: "",
      related: [],
    },
  },
  scamdb: {},
};
const ipfs = new IPFS({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

export default class MetaDataContract {
  constructor() {
    this.contractAddress = "0x201be2022c9b58428d6a5743f2bd4cb8934547df";
    this.contract = eth.contract(abi).at(this.contractAddress);
    this.contractView = ethRead.contract(abi).at(this.contractAddress);
    this.price = 0;
    this.account = this.curator = false;
    this.index = 0;
    this.history = [];
    this.onReceiptFN = () => {};
  }

  async getHistory() {
    let index = await this.contractView.getIndex();
    index = index[0].toNumber() - 1;
    this.history = [];
    for (let i = index; i > index - 10; i--) {
      let h = await this.contractView.getByIndex(i);
      h.key = i;
      this.history.push(h);
    }
    let unique = [];
    return this.history.filter((item, index) => {
      let exists = unique.indexOf(item[0]) === -1;
      unique.push(item[0]);
      return exists;
    });
  }

  getMetamask() {
    getMetamaskAccounts((accounts, error) => {
      if (error) {
        console.error(error);
        return;
      }
      eth.setProvider(window.web3.currentProvider);
    });
  }

  async isCurator() {
    return this.contractView
      .isCurator(this.getCurrentAccount())
      .then(response => {
        if (response[0]) {
          this.curator = true;
          return true;
        }
        return false;
      })
      .catch(error => {
        return false;
      });
  }

  async getNetwork() {
    return eth.net_version();
  }

  getPrice = async () => {
    try {
      let result = await this.contract.getPrice();
      this.price = result[0];
      let usd = await this.getUSD();
      let eth = parseFloat(Eth.fromWei(result[0], "ether"));
      return { eth: eth, usd: (eth * usd).toFixed(2) };
    } catch (e) {
      return { eth: "ERROR", usd: "ERROR" };
    }
  };

  async getUSD() {
    return axios
      .get(
        "https://api.etherscan.io/api?module=stats&ohai&action=ethprice&apikey=EJ9XCX8ZNI65MUH9JGN6Y4CRM1TGK32MUF",
      )
      .then(function(response) {
        return parseFloat(response.data.result.ethusd);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  isValidAddress(address) {
    if (address && address.length === 42) return Eth.isAddress(address);
    return false;
  }

  async getAddressData(address) {
    if (!Eth.isAddress(address)) return {};
    return this.contractView.getByAddress(address).then(result => {
      if (result[0] === "0x0000000000000000000000000000000000000000") return;
      return this.lookUp(result[2])
        .then(ipfs => {
          return {
            address: result[0],
            name: result[1],
            data: JSON.parse(JSON.stringify(ipfs)),
            self_attested: result[3],
            curated: result[4],
            submitter: result[5],
          };
        })
        .catch(err => {
          return {
            address: result[0],
            name: result[1],
            data: { data: "no data for this address" },
          };
        });
    });
  }

  getCurrentAccount() {
    if (window.web3) return window.web3.eth.accounts[0];
    else return null;
  }

  getEmptyObject() {
    let newObj = JSON.parse(JSON.stringify(json));
    return newObj;
  }

  async storeMetadata(address, _name, data, _onReceipt) {
    return new Promise((resolve, reject) => {
      ipfs.addJSON(data, (err, result) => {
        // console.log(`IPFS Hash: ${result}`);
        if (result === undefined || err)
          reject(new DOMException("Couldn't add metadata to IPFS"));
        // console.log(address, _name, result);
        if (this.curator) {
          // console.log("curator");
          return this.contract
            .addByCurator(address, _name, result, {
              from: window.web3.eth.accounts[0],
            })
            .then(result => {
              // onReceipt(result, {
              //     network: "ropsten",
              // })
              //     .then(r => {
              //         _onReceipt();
              //     })
              //     .catch(console.error);
              resolve(result);
            })
            .catch(err => {
              console.log(err);
              reject(err);
            });
        } else
          return this.contract
            .addAddress(address, _name, result, {
              from: window.web3.eth.accounts[0],
              value: this.price,
            })
            .then(result => {
              // onReceipt(result, {
              //     network: "ropsten",
              // })
              //     .then(r => {
              //         _onReceipt();
              //     })
              //     .catch(console.error);
              resolve(result);
            })
            .catch(err => {
              console.log(err);
              reject(err);
            });
      });
    });
  }

  async storeJsonIPFS(data) {
    return new Promise((resolve, reject) => {
      reader = new FileReader();
      reader.onerror = () => {
        reader.abort();
        reject(new DOMException("Problem parsing input file."));
      };
      reader.onload = () => {
        let json = JSON.parse(reader.result);
        ipfs.addJSON(json, (err, result) => {
          if (err) reject(err);
          console.log(result);
          resolve(result);
        });
      };
      reader.readAsText(data);
    });
  }

  async storeDataIPFS(data) {
    return new Promise((resolve, reject) => {
      reader = new FileReader();
      reader.onerror = () => {
        reader.abort();
        reject(new DOMException("Problem parsing input file."));
      };
      reader.onload = () => {
        ipfs.add(reader.result, (err, result) => {
          if (err) reject(err);
          console.log(result);
          resolve(result);
        });
      };
      reader.readAsText(data);
    });
  }

  async convertBlobToBase64(blob) {
    console.log(blob);
    return new Promise((resolve, reject) => {
      reader = new FileReader();
      reader.onerror = () => {
        reader.abort();
        reject(new DOMException("Problem parsing input file."));
      };
      reader.onload = () => {
        resolve(reader.result);
      };
      console.log(blob);
      reader.readAsDataURL(blob);
    });
  }

  async lookUp(address) {
    if (address);
    return new Promise((resolve, reject) => {
      ipfs.catJSON(address, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }
}

// for reference, 2 nov new Web3 request as per https://github.com/bitpshr/EIPs/blob/1102-readonly-provider/EIPS/eip-1102.md
// window.addEventListener('load', async () => {
//     // Read-only provider is exposed by default
//     console.log(await ethereum.send('net_version'));
//     try {
//         // Request full provider if needed
//         await ethereum.enable();
//         // Full provider exposed
//         await ethereum.send('eth_sendTransaction', [/* ... */]);
//     } catch (error) {
//         // User denied full provider access
//     }
// });

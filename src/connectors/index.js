import { InjectedConnector } from '@web3-react/injected-connector';
import { NetworkConnector } from '@web3-react/network-connector';

const POLLING_INTERVAL = 10000

export const network = new NetworkConnector({
  urls: { 1: process.env.REACT_APP_NETWORK_URL },
  pollingInterval: POLLING_INTERVAL
})

export const injected = new InjectedConnector({
  supportedChainIds: [1]
})

export const walletconnect = new WalletConnectConnector({
  rpc: { 1: process.env.REACT_APP_NETWORK_URL },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: false,
  pollingInterval: POLLING_INTERVAL
})

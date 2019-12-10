import { InjectedConnector } from '@web3-react/injected-connector';
import { NetworkConnector } from '@web3-react/network-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { AbstractConnectorInterface } from '@web3-react/types';

const POLLING_INTERVAL = 8000;
const RPC_URLS: { [chainId: number]: string } = {
  1: process.env.REACT_APP_RPC_URL_1 as string,
  4: process.env.RREACT_APP_RPC_URL_4 as string
};

export const injected = new InjectedConnector({ supportedChainIds: [1] });

export const network = new NetworkConnector({
  urls: { 1: RPC_URLS[1] },
  defaultChainId: 1,
  pollingInterval: POLLING_INTERVAL
});

export const walletconnect = new WalletConnectConnector({
  rpc: { 1: RPC_URLS[1] },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: POLLING_INTERVAL
});

export const connectorsByName: { [name: string]: AbstractConnectorInterface } = {
  Injected: injected,
  Network: network,
  WalletConnect: walletconnect
}

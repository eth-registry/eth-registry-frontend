import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient, { gql,  InMemoryCache } from "apollo-boost";
import React from 'react';
import { InjectedConnector } from '@web3-react/injected-connector'
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Web3Provider from "web3-react";
import Home from './views/Home';

if (!process.env.REACT_APP_GRAPHQL_ENDPOINT) {
  throw new Error('REACT_APP_GRAPHQL_ENDPOINT environment variable not defined');
}

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});

export const ENTRIES_QUERY = gql`
  query getLatestEntries {
    entries(first: 10) {
      id
      count
      contractAddress
      delegate
    }
  }
`;

const injected = new InjectedConnector({ supportedChainIds: [Number(process.env.REACT_APP_NETWORK_ID) || 1] });

// TODO: Add route supporting deprecated app...maybe a static page with the bundle of the latest release
function AppRouter() {
  return (
    <Web3Provider connectors= {{ injected }} libraryName="ethers.js">
      <ApolloProvider client={client}>
        <Router>
          <div>
           <header>
              <Switch>
                <Route path="/" exact component={Home} />
              </Switch>
            </header>
          </div>
        </Router>
      </ApolloProvider>
    </Web3Provider>
  );
}

export default AppRouter;

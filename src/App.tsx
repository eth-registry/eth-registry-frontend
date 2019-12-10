import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient, { gql,  InMemoryCache } from "apollo-boost";
import React from 'react';
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';
import Home from './views/Home';
import Header from './components/Header';

function getLibrary(provider:any):Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 10000;

  return library;
}
if (!process.env.REACT_APP_GRAPHQL_ENDPOINT) {
  throw new Error('REACT_APP_GRAPHQL_ENDPOINT environment variable not defined');
}
if (!process.env.REACT_APP_RPC_URL_1) {
  throw new Error('RPC_URL_1 environment variable not defined');
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

// TODO: Add route supporting deprecated app...maybe a static page with the bundle of the latest release
function AppRouter() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ApolloProvider client={client}>
      <header>
        <Header />
      </header>
      <Router>
          <Switch>
            <Route path="/" exact component={Home} />
          </Switch>
      </Router>
    </ApolloProvider>
   </Web3ReactProvider>
  );
}

export default AppRouter;

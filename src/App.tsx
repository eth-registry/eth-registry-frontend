import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient, { gql,  InMemoryCache } from "apollo-boost";
import React from 'react';
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Home from './views/Home';
import Header from './components/Header';

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

//const injected = new InjectedConnector({ supportedChainIds: [Number(process.env.REACT_APP_NETWORK_ID) || 1] });
//const connectors = { injected };

// TODO: Add route supporting deprecated app...maybe a static page with the bundle of the latest release
function AppRouter() {
  return (
    <ApolloProvider client={client}>
      <Router>
          <Switch>
            <Route path="/" exact component={Home} />
          </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default AppRouter;

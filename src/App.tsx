import React from 'react';
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient, { gql,  InMemoryCache } from "apollo-boost";
import Web3Provider from "web3-react";
import Home from './views/Home';

if (!process.env.REACT_APP_GRAPHQL_ENDPOINT) {
  throw new Error('REACT_APP_GRAPHQL_ENDPOINT environment variable not defined')
}

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
})



function App() {
  return (
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
  );
}

export default App;

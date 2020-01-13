import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import React from 'react';
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';
import ThemeProvider from './theme'
import Home from './views/Home';
import Report from './views/Report';
import Header from './components/Header';
import Footer from './components/Footer';

function getLibrary(provider:any):Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 10000;

  return library;
}

if (!process.env.REACT_APP_GRAPHQL_ENDPOINT) {
  throw new Error('REACT_APP_GRAPHQL_ENDPOINT environment variable not defined');
}

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});

// TODO: Add route supporting deprecated app...maybe a static page with the bundle of the latest release
function AppRouter() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ApolloProvider client={client}>
        <ThemeProvider>
          <Router>
          <header>
            <Header />
          </header>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/report" exact component={Report} />
          </Switch>
          </Router>
          <footer>
            <Footer />
          </footer>
        </ThemeProvider>
      </ApolloProvider>
    </Web3ReactProvider>
  );
}

export default AppRouter;

import React from "react";
import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';
import Header from '../components/Header';

function getLibrary(provider:any):Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 10000;

  return library;
}

export default function Home() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <header>
        <Header />
      </header>
      <div>Hello World</div>
    </Web3ReactProvider>
  );
}

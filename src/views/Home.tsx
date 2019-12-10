import React from "react";
import styled from 'styled-components';

const Greeting = styled.div`
  max-width: 42rem;
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Byline = styled.h2`
  margin-top: 2rem;
  font-weight:200;
  text-align:center;
  font-family: 'Tomorrow', sans-serif;
`;

const Body = styled.p`
  font-size: 1rem;
  position: relative;
  font-weight:100;
  letter-spacing: 0.06rem;
  padding: 10px;
  float: left;
  font-family: 'Roboto', sans-serif;
`;

export default function Home() {
  return (
    <Greeting>
      <Byline>Submit <i>Unstoppable</i> Metadata</Byline>
      <Body>
          ETHRegistry stores information you submit about an Ethereum address
          on the blockchain and IPFS to make it <b>openly accessible to users, wallets and apps</b> without having to
          go through third parties that lock your data behind APIs. We wish to
          provide the Ethereum ecosystem with an easy way to add, edit and
          access information such as logo, url, token information or scam type
          to the Ethereum blockchain.
      </Body>
    </Greeting>
   );
}

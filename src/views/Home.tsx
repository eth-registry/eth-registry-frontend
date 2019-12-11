import React from "react";
import styled from 'styled-components';
import FormManager from '../components/FormManager';
import { Schemas } from '../types/Schemas';

const Greeting = styled.div`
  max-width: 42rem;
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 10px;
  .MuiFormLabel-root, .MuiButton-label {
    font-family: "Tomorrow", sans-serif;
  }
`;

const Byline = styled.h2`
  ${({ theme }) => theme.bylineText }
  margin-top: 4rem;
`;


const Body = styled.p`
  ${({ theme }) => theme.bodyText }
  margin-top: 2rem;
  position: relative;
  display:inline-block;
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
          to the Ethereum blockchain.<br /><br />
          The current version deployed on mainnnet accepts any IPFS multihash from contract deployers or from users looking to self-attest
          metadata about their address. Publishing rights default to initial submitters who can delegate write access to another address.
      </Body>
      <FormManager initialState={{ initial: Schemas.GENERIC }}  />
    </Greeting>
   );
}

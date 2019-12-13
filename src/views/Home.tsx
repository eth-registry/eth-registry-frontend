import React from "react";
import styled from 'styled-components';
import FormManager from '../components/FormManager';
import Submissions from '../components/Submissions';
import { Schemas } from '../types/Schemas';
import { MetadataRegistryAddress } from '../constants/';

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
  border-bottom: 1px solid hsla(0,0%,0%,0.07);
  line-height: 2.5;
`;


const Body = styled.p`
  ${({ theme }) => theme.bodyText }
  margin-top: 2rem;
  position: relative;
  display:inline-block;
  a {
   text-decoration:none;
  }
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
      <Byline>Recent Submissions</Byline>
      <Submissions />
      <Byline>More Information</Byline>
      <Body>
        <b>Metadata Contract:</b>{" "}
        <a
          href={"http://canary.ethtective.com/" + MetadataRegistryAddress}
          target="_blank"
          rel="noopener noreferrer"
        >
          <code>{MetadataRegistryAddress}</code>
        </a>
        <p>
          There are three methods available to you as a delegate:<br/><br />
          - <code>updateEntry(address, digest, hashFunction, size)</code><br />- <code>setDelegate(address, address)</code><br />- <code>clearEntry(address)</code><br /><br />
          As you can see the API require us to use multihash format, this is to reduce gas costs and future-proof the hash format. More schemas soon to come such as ERC721/ERC1456. <br />Set the delegate to
          {" "}<code>0xFFfFfFffFFfffFFfFFfFFFFFffFFFffffFfFFFfF</code> enable any Ethereum address publishing rights. Hope you know what you're doing... :)<br /><br />
          If not, be sure to check out the <a href={"https://github.com/corydickson/eth-metadata-registry/blob/master/README.md"} target="_blank" rel="noopener noreferrer">docs</a>.
        </p>
      </Body>
    </Greeting>
   );
}

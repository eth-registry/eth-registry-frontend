import React from "react";
import styled from 'styled-components';
import { Button, TextField } from '@material-ui/core';

const Greeting = styled.div`
  max-width: 42rem;
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 10px;
`;

const Byline = styled.h2`
  font-size:3rem;
  font-weight:200;
  font-family: 'Tomorrow', sans-serif;
`;

const Body = styled.p`
  font-size: 0.9rem;
  position: relative;
  font-weight:100;
  letter-spacing: 0.06rem;
  display:inline-block;
  font-family: 'Roboto', sans-serif;
`;

const ButtonRow = styled.div`
  margin-top: 0.2rem;
  float: right;
`;

const StyledButton = styled(Button)`
  margin: 10px !important;
`;

export default function Home() {
  const ethtective = () => {
    window.open(
      "https://canary.ethtective.com/",
      "_blank",
    );
  };

  const etherscan = () => {
    window.open(
      "https://ropsten.etherscan.io/address/",
      "_blank",
    );
  };


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
      <form noValidate autoComplete="off" className="form">
          <TextField
            fullWidth
            required={true}
            label="Address"
            className="top-padding monofont addressbar"
          />
      </form>
      <ButtonRow>
        <StyledButton
          size="small"
          variant="contained"
          color="secondary"
          onClick={etherscan}
        >
          View on Etherscan
        </StyledButton>
        <StyledButton
          size="small"
          color="secondary"
          variant="contained"
          onClick={ethtective}
        >
          View on Ethtective
        </StyledButton>
      </ButtonRow>
    </Greeting>
   );
}

import React, { useState, useEffect } from "react";
import { useWeb3React } from '@web3-react/core';
import styled from 'styled-components';
import { Button, TextField } from '@material-ui/core';
import { isAddress } from '../../helpers/index.js';
import { Schemas } from '../../types/Schemas';
import GenericForm from "./GenericForm";
import ERC1456Form from "./ERC1456Form";
import { StyledForm, ButtonRow } from '../../theme/components';
import "../../theme/form.css";
import EthRegistry from '../../helpers/registry.js';

const StyledButton = styled(Button)`
  ${({ theme }) => theme.bodyText }
  margin: 10px !important;
`;

// This should also be able to retrieve the hash from the account stored in each of the respective registries and store it in the state
// i.e. if one is already set, it will check the permissions for that particular contract and given the account by the provider will notify the user
// and prepopulate the form with existing information
const registry = new EthRegistry(null);

export default function FormManager(props: any) {
  const { library, account } = useWeb3React();

  // TODO: create context states for each form schema
  const [editAddress, setEditAddress] = useState('');
  const [contractData, setContractData] = useState({});
  const [exists, setExists] = useState(false);

  useEffect(() => {
    async function fetchIPFSHash() {
      if (isAddress(editAddress)) {
        let contractdata: any = await registry.get(editAddress);
        setContractData(contractdata);
      }
    }
    fetchIPFSHash();
  }, [editAddress]);

  function getForm() {
    if (props.activeForm) {
      if (props.activeForm === Schemas.ERC1456) {
        return (
          <ERC1456Form contractData={contractData} editAddress={editAddress} badges={props.badges} />
        );
      }

      if (props.activeForm === Schemas.GENERIC) {
        return (
          <GenericForm editAddress={editAddress} />
        );
      }
    }

    return null;
  }

  const ethtective = () => {
    window.open(
      "https://canary.ethtective.com/" + editAddress,
      "_blank",
    );
  };

  const etherscan = () => {
    window.open(
      "https://ropsten.etherscan.io/address/" + editAddress,
      "_blank",
    );
  };

  const errorAddress: boolean = !isAddress(editAddress) && editAddress.length > 0;

  return (
    <>
      <StyledForm autoComplete="off">
        <TextField
          fullWidth
          required={true}
          label="Address"
          error={errorAddress}
          helperText={errorAddress ? "Not a valid ethereum address..." : ""}
          onChange={(e) => setEditAddress(e.target.value)}
        />
      </StyledForm>
      <ButtonRow>
        <StyledButton
          disabled={!isAddress(editAddress)}
          size="small"
          variant="contained"
          color="secondary"
          onClick={etherscan}
        >
          View on Etherscan
        </StyledButton>
        <StyledButton
          disabled={!isAddress(editAddress)}
          size="small"
          color="secondary"
          variant="contained"
          onClick={ethtective}
        >
          View on Ethtective
        </StyledButton>
      </ButtonRow>
      {getForm()}
    </>
  );
}

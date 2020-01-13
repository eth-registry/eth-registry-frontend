import React, { useContext, useEffect, useState } from "react";
import { useWeb3React } from '@web3-react/core';
import styled from 'styled-components';
import { Button, TextField } from '@material-ui/core';
import { isAddress } from '../../helpers/index.js';
import { Schemas } from '../../types/Schemas';
import { ActiveFormContext, EditAddressContext } from '../../contexts';
import GenericForm from './GenericForm';
import ERC1456Form from './ERC1456Form';
import { registry } from '../../contexts';
import { StyledForm, ButtonRow } from '../../theme/components';
import '../../theme/form.css';

const StyledButton = styled(Button)`
  ${({ theme }) => theme.bodyText }
  margin: 10px !important;
`;

// TODO: This should also be able to retrieve the hash from the account stored in each of the respective registries and store it in the state
// i.e. if one is already set, it will check the permissions for that particular contract and given the account by the provider will notify the user
// and prepopulate the form with existing information
export default function FormManager(props: any) {
  const { account } = useWeb3React();
  const activeForm = useContext(ActiveFormContext);

  const [editAddress, setEditAddress] = useState('');
  const [canEdit, setCanEdit] = useState(false);
  const [contractData, setContractData] = useState({});

  useEffect(() => {
    async function fetchIPFSHash() {
      if (isAddress(editAddress)) {
        let contractdata: any = await registry.get(editAddress);
        setContractData(contractdata);
      }
    }

    async function getCuratorStatus() {
      if (account) {
        let curator: boolean = await registry.isCurator(account);
        setCanEdit(curator);
      }
    }
    fetchIPFSHash();
    getCuratorStatus();
  }, [account, editAddress]);

  function getForm() {
    if (activeForm) {
      if (activeForm === Schemas.ERC1456) {
        return (
          <ERC1456Form canEdit={canEdit} contractData={contractData} />
        );
      }

      if (activeForm === Schemas.GENERIC) {
        return (
          <GenericForm />
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
      <EditAddressContext.Provider value={editAddress}>
        {getForm()}
      </EditAddressContext.Provider>
      </>
  );
}

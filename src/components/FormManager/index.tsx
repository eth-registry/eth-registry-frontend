import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core';
import { Button, Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import { Schemas } from '../../types/Schemas';
import { getBytes32FromMultihash, canConvertToBase58, isAddress } from '../../helpers/index.js';
import { useRegistryContract } from '../../hooks';
import { MetadataRegistryAddress, InvalidNonce } from '../../constants/';

const SubmitButton = styled(Button)`
  ${({ theme }) => theme.bodyText }
  margin-top: 3rem;
  width: 100%;
  color: ${({ theme }) => theme.black };
  align-items: center;
  padding: 0.5rem;
  border-radius: 2rem;
  box-sizing: border-box;
  cursor: pointer;
  user-select: none;
  :focus {
    outline: none;
  }
`;

const ButtonRow = styled.div`
  margin-top: 0.2rem;
  margin-bottom: 1.5rem;
  float: right;
`;

const StyledForm = styled.form`
  .MuiFormControlLabel-label, .MuiInput-formControl, .MuiFormHelperText-filled {
    font-family: "Tomorrow", sans-serif !important;
  }
`;

const StyledButton = styled(Button)`
  ${({ theme }) => theme.bodyText }
  margin: 10px !important;
`;

export default function FormManager({ initialState }: any) {
  const { initial } = initialState;

  // TODO: Add tabbed support for multiple forms see types/schemas.ts
  const [activeForm, setActiveForm] = useState(initial);
  const { library, account } = useWeb3React();
  const contract = useRegistryContract(MetadataRegistryAddress);

  // TODO: create context states for each form schema
  const [editAddress, setEditAddress] = useState('');
  const [ipfsHash, setIPFSh] = useState('');
  const [checkbox, setCheckbox] = useState({
    contract: false,
    selfAttested: false,
  });

  const handleCheckbox = (name: string) => (event: any) => {
    setCheckbox({...checkbox, [name]: event.target.checked });
  };

  const handleEditAddress = (event: any) => {
    setEditAddress(event.target.value);
  };

  const handleIPFS = (event: any) => {
    setIPFSh(event.target.value);
  };

  const canSubmit = (editAddress: string, ipfsHash:string) => {
    let isValid = false;
    if (isAddress(editAddress)) {
      isValid = canConvertToBase58(ipfsHash);
    }

    return isValid;
  }

  const handleSubmit = (event: any) => {
    if (event) event.preventDefault();
  }


  const submitTransaction = async () => {
    console.log("I just sent the transaction!!! " + account + editAddress + ipfsHash + checkbox.contract);

    let nonce = InvalidNonce;
    if (checkbox.contract) {
      nonce = await library.getTransactionCount(account);
    }

    const metadata = getBytes32FromMultihash(ipfsHash);
    contract.createEntry(editAddress, metadata.digest, metadata.hashFunction, metadata.size, nonce).then((res:any) => {
      console.log(res);
    });
  }

  // TODO: move to hooks file if used elsewhere
  useEffect(() => {
    setCheckbox(c => {
      if (c) {
        if (account && editAddress.length > 0) {
          return {...c, selfAttested: (account === editAddress)};
        }
      }
      return {...c};
    });
  }, [account, editAddress]);

  function getForm() {
    if (activeForm) {
      if (activeForm === Schemas.GENERIC) {
        return (
          <div>
            <StyledForm onSubmit={handleSubmit}>
              <TextField
                fullWidth
                required={true}
                label="IPFS Hash"
                error={!canConvertToBase58(ipfsHash) && ipfsHash.length > 0}
                helperText={!canConvertToBase58(ipfsHash) && ipfsHash.length > 0 ? "There was an error checking the encoding..." : ""}
                onChange={handleIPFS}
              />
              <ButtonRow>
                <FormControlLabel
                  control={
                    <Checkbox checked={checkbox.contract} onChange={handleCheckbox('contract')} />
                  }
                  label="Is this a contract or token?"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={checkbox.selfAttested} onChange={handleCheckbox('selfAttested')} />
                  }
                  label="Is this self-attested?"
                />
              </ButtonRow>
              <SubmitButton
                type="submit"
                disabled={!canSubmit(editAddress, ipfsHash)}
                onClick={submitTransaction}
              >
                Sign Transaction
              </SubmitButton>
            </StyledForm>
          </div>
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
          onChange={handleEditAddress}
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

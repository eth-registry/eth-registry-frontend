import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core';
import { Checkbox, TextField, FormControlLabel } from '@material-ui/core';
import { getBytes32FromMultihash, canConvertToBase58, isAddress } from '../../helpers/index.js';
import { AnyDelegate, NoDelegate, MetadataRegistryAddress } from '../../constants/';
import { EditAddressContext } from '../../contexts';
import { useRegistryContract } from '../../hooks';
import { SubmitButton, StyledForm, ButtonRow } from '../../theme/components';

const DelegateRow = styled.div`
  ${({ theme }) => theme.bodyText }
  display:block;
  margin: 2rem 0;
  width: 100%;
  float:left;
`

export default function GenericForm(props: any) {
  const [ipfsHash, setIPFSHash] = useState('');
  const [delegate, setDelegate] = useState('');
  const editAddress = useContext(EditAddressContext);
  const [checkbox, setCheckbox] = useState({
    contract: false,
    selfAttested: false,
  });

  //Contract state
  const { library, account } = useWeb3React();
  const contract = useRegistryContract(MetadataRegistryAddress);

  const handleCheckbox = (name: string) => (event: any) => {
    setCheckbox({...checkbox, [name]: event.target.checked });
  };

  const handleSubmit = (event: any) => {
    if (event) event.preventDefault();
  }

  const isDelegate = async (editAddress: string) => {
    if (account) {
      return contract.getDelegate(editAddress).then((res:any) => {
        setDelegate(res);

        if (res === NoDelegate) {
          return true;
        }

        return res === account || res === AnyDelegate;
      }).catch((err:any) => {
        console.error(err);
      });
    }

    return false;
  }

  const canSubmit = (editAddress: string, ipfsHash:string) => {
    let isValid = false;
    if (isAddress(editAddress) && account) {
      isValid = canConvertToBase58(ipfsHash);
    }

    return isValid && isDelegate(editAddress);
  }

  const submitTransaction = async (e:any) => {
    e.preventDefault();
    console.log("I just sent the transaction!!! " + account + editAddress + ipfsHash + checkbox.contract);

    /** if you provide an invalid nonce the transaction fails since it only takes unsigned ints in the api
    * we should probably change this to make the ux cleaner because otherwise how would we handle submissions
    * that are not-self attested && not contracts but msg.sender has delegate rights to update?
    *
    * let nonce = INVALID_NONCE;
    */

    let nonce = await library.getTransactionCount(account);
    const metadata = getBytes32FromMultihash(ipfsHash);

    contract.createEntry(editAddress, metadata.digest, metadata.hashFunction, metadata.size, nonce).then((res:any) => {
      console.log(res);
    }).catch((err:any) => {
      console.error(err);
    });
  }

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

  function renderDelegateStatus() {
    if (account) {
      if (delegate.length === 0) {
        return null;
      }
      else {
        let addr = (delegate === NoDelegate ? 'N/A' : delegate);

        return (
          <DelegateRow>
            {"Current Delegate: " + addr}
          </DelegateRow>
        );
      }
    }
  }

  return(
    <div>
      <StyledForm onSubmit={handleSubmit}>
        <TextField
          fullWidth
          required={true}
          label="IPFS Hash"
          error={!canConvertToBase58(ipfsHash) && ipfsHash.length > 0}
          helperText={!canConvertToBase58(ipfsHash) && ipfsHash.length > 0 ? "There was an error checking the encoding..." : ""}
          onChange={e => setIPFSHash(e.target.value)}
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
        {renderDelegateStatus()}
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

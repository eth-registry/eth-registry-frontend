import React, { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Checkbox, TextField, FormControlLabel } from '@material-ui/core';
import { getBytes32FromMultihash, canConvertToBase58, isAddress } from '../../helpers/index.js';
import { MetadataRegistryAddress } from '../../constants/';
import { useRegistryContract } from '../../hooks';
import { SubmitButton, StyledForm, ButtonRow } from '../../theme/components';

export default function GenericForm(props: any) {
  const [ipfsHash, setIPFSHash] = useState('');
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

  const canSubmit = (editAddress: string, ipfsHash:string) => {
    let isValid = false;
    if (isAddress(editAddress)) {
      isValid = canConvertToBase58(ipfsHash);
    }

    return isValid;
  }

  const submitTransaction = async (e:any) => {
    e.preventDefault();
    console.log("I just sent the transaction!!! " + account + props.editAddress + ipfsHash + checkbox.contract);

    /** if you provide an invalid nonce the transaction fails since it only takes unsigned ints in the api
    * we should probably change this to make the ux cleaner because otherwise how would we handle submissions
    * that are not-self attested && not contracts but msg.sender has delegate rights to update?
    *
    * let nonce = INVALID_NONCE;
    */

    let nonce = 1;
    if (checkbox.contract) {
      nonce = await library.getTransactionCount(account);
      console.log('the users nonce is: ' + nonce);
    }

    const metadata = getBytes32FromMultihash(ipfsHash);

    contract.createEntry(props.editAddress, metadata.digest, metadata.hashFunction, metadata.size, nonce).then((res:any) => {
      console.log(res);
    }).catch((err:any) => {
      console.error(err);
    });
  }

  useEffect(() => {
    setCheckbox(c => {
      if (c) {
        if (account && props.editAddress.length > 0) {
          return {...c, selfAttested: (account === props.editAddress)};
        }
      }
      return {...c};
    });
  }, [account, props.editAddress]);

  const { editAddress } = props;

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

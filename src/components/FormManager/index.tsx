import React, { useState } from "react";
import styled from 'styled-components';
import { Button, TextField } from '@material-ui/core';
import { isAddress } from '../../helpers/index.js';
import { Schemas } from '../../types/Schemas';
import GenericForm from "./GenericForm";
import ERC1456Form from "./ERC1456Form";
import { StyledForm, ButtonRow } from '../../theme/components';
import "../../theme/form.css";

const StyledButton = styled(Button)`
  ${({ theme }) => theme.bodyText }
  margin: 10px !important;
`;

export default function FormManager(props: any) {
  // TODO: create context states for each form schema
  const [editAddress, setEditAddress] = useState('');

  function getForm() {
    if (props.activeForm) {
      if (props.activeForm === Schemas.ERC1456) {
        return (
          <ERC1456Form badges={props.badges} />
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

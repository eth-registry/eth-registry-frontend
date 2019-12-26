import styled from 'styled-components';
import { Button } from '@material-ui/core';

export const SubmitButton = styled(Button)`
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

//TODO: Figure out why typography is being ignored in the themeprovider
export const StyledForm = styled.form`
  .MuiFormControlLabel-label, .MuiInput-formControl, .MuiFormHelperText-filled {
    font-family: "Tomorrow", sans-serif !important;
  }
`;

export const ButtonRow = styled.div`
  margin-top: 0.2rem;
  margin-bottom: 1.5rem;
  float: right;
`;



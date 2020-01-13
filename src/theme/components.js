import styled from 'styled-components';
import { Button } from '@material-ui/core';

export const SubmitButton = styled(Button)`
  ${({ theme }) => theme.bodyText }
  background-color: #60618b0d !important;
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

export const Byline = styled.h2`
  ${({ theme }) => theme.bylineText }
  margin-top: 4rem;
  border-bottom: 1px solid hsla(0,0%,0%,0.07);
  line-height: 2.5;
`;

export const BodyWrapper = styled.div`
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

export const Body = styled.p`
  ${({ theme }) => theme.bodyText }
  margin-top: 2rem;
  position: relative;
  display:inline-block;
  a {
   text-decoration:none;
  }
`;

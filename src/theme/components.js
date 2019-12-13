import styled from 'styled-components';

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



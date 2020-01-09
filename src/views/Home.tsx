import React, { useState } from "react";
import styled from 'styled-components';
import { ActiveFormContext } from '../contexts';
import FormManager from '../components/FormManager';
import Submissions from '../components/Submissions';
import Information from '../components/Information';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Body } from '../theme/components';
import { Schemas } from '../types/Schemas';
// import { schemaDefinitionNotAloneMessage } from "graphql/validation/rules/LoneSchemaDefinition";

// TODO: fix theme provider and styled drop down in there....
const StyledFormControl = styled(FormControl)`
  vertical-align: middle !important;
  padding-top: 0px !important;

  .MuiButtonBase-root MuiListItem-root MuiMenuItem-root Mui-selected MuiMenuItem-gutters MuiListItem-gutters MuiListItem-button Mui-selected {
    font-family: "Tomorrow", sans-serif !important;
  }

  svg {
    display:none;
  }

  .MuiInputBase-root {
    font-family: "Tomorrow", sans-serif;
    font-size: 2rem;
    line-height: 2.5;
  }
  .MuiInputBase-input {
    padding: 0px 0 10px;
  }

  .MuiInput-underline:before {
    content: none;
  }

  .MuiSelect-selectMenu.MuiSelect-selectMenu {
    padding-right: 0.75rem;
  }
`

const Greeting = styled.div`
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

const Byline = styled.h2`
  ${({ theme }) => theme.bylineText }
  margin-top: 4rem;
  border-bottom: 1px solid hsla(0,0%,0%,0.07);
  line-height: 2.5;
`;

export default function Home() {
  const [activeForm, setActiveForm] = useState(Schemas.GENERIC);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setActiveForm(event.target.value as Schemas);
  };

  return (
    <Greeting>
      <Byline>Submit{" "}
        <StyledFormControl>
          <Select value={activeForm} onChange={handleChange} displayEmpty>
            <MenuItem value={Schemas.GENERIC}>
              <i>Unstoppable</i>
            </MenuItem>
            <MenuItem value={Schemas.ERC1456}><i>Curated</i></MenuItem>
          </Select>
        </StyledFormControl>
        Metadata
      </Byline>
      <Body>
          ETHRegistry stores information you submit about an Ethereum address
          on the blockchain and IPFS to make it <b>openly accessible to users, wallets and apps</b> without having to
          go through third parties that lock your data behind APIs. We wish to
          provide the Ethereum ecosystem with an easy way to add, edit and
          access information such as logo, url, token information or scam type to the Ethereum blockchain.<br /><br />
          The current version deployed on mainnnet accepts any IPFS multihash from contract deployers or from users looking to self-attest
          metadata about their address. Publishing rights default to initial submitters who can delegate write access to another address.
      </Body>
      <ActiveFormContext.Provider value={activeForm}>
        <FormManager badges={['malicious']} />
        <Byline>Recent Submissions</Byline>
        <Submissions />
        <Byline>More Information</Byline>
        <Information />
      </ActiveFormContext.Provider>
    </Greeting>
   );
}

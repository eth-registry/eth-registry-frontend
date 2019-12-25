import React, { useState, useEffect, createRef } from 'react';
import { useWeb3React } from '@web3-react/core';
import Edit from "@material-ui/icons/Edit";
import { Grid, InputBase, InputAdornment } from '@material-ui/core';
import { ERC1456 } from '../../types/Schemas';
import FormComponent from "./FormComponent";
import LogoDrop from "./LogoDrop";
import Registry from "./Registry"; //single priority icon
import EthRegistry from '../../helpers/registry.js';

// Existing entries:
// http://localhost:3000/edit/0x267be1c1d684f78cb4f6a176c4911b741e4ffdc0 kraken
// http://localhost:3000/edit/0x42d6622dece394b54999fbd73d108123806f6a18 spankchain
// http://localhost:3000/edit/0x6090a6e47849629b7245dfa1ca21d94cd15878ef ens

export default function ERC1456Form(props: any) {
  const { library, account } = useWeb3React();
  const registry = new EthRegistry(library);

  const erc1456Form = createRef<HTMLFormElement>();
  const [formState, setFormState] = useState({
    data: {
      metadata: {
        url: "",
        description: "",
        name: "",
        logo: "",
        contact: {
          email: "",
          peepeth: "",
          press: "",
          support: "",
        },
      },
      contract: {
        abi: [],
        source: "",
        compiler: "",
        language: "",
        optimizer: "",
        swarm: "",
        constructor_arguments: "",
      },
    },
    contractdata: {
      description: "",
      submitter: "",
    },
    permission: ""
  } as any); // TODO: until we type the state

  const { data, contractdata } = formState;
  const { metadata } = data;

  const handleChange = (name: string) => (evt: any) => {
    if (evt === undefined) return; // we need this check for the logo drop since no event is fired
    const val = evt.target ? evt.target.value : evt;
    setFormState({...formState, [name]: val});
  };

  const permissionText = (contractdata: any) => {
    let currentAccount = account ? account : undefined;
    if (!contractdata) return "disconnected";
    if (contractdata.self_attested || contractdata.curated) {
      if (currentAccount && currentAccount === contractdata.address)
        return "verified_self";
      if (contractdata.self_attested) return "verified";
      if (contractdata.curated) return "curated";
    }
    return "any";
  }

  const clearEditor = () => {
    let json = registry.getEmptyObject();
    json.address = props.editAddress;

    setFormState({
      ...formState,
      data: {
        metadata: json.metadata,
        contract: {
          abi: [],
          source: "",
          compiler: "",
          language: "",
          optimizer: "",
          swarm: "",
          constructor_arguments: "",
        }
      },
      contractdata: json,
      permission: permissionText(json),
    });
  }

  const populateEditor = (contractdata: any): boolean => {
    if (contractdata === {}) return false;
    let md = contractdata.data ? contractdata.data.metadata : undefined; // we need to use the types here
    let contract = md ? md.contract : undefined; // we need to use the types here
    console.log(md);
    console.log(contract);
    if (!md) return false;
    if (!contract) return false;

    setFormState({
      ...formState,
      data: {
        metadata: md,
        contract: contract
      },
      contractdata: contractdata,
    });

    return true
  }

  useEffect(() => {
    async function getCuratedData(contractdata:any) {
      if (populateEditor(contractdata)) {
        // this.props.setType(contractdata);
        // This would change the text to unstoppable -> curated, maybe there is a dropdown
        // with transparent background elements over the text
      } else {
        clearEditor();
      }
    }

    if (props.contractData) {
      getCuratedData(props.contractData);
    }
  }, [props.editAddress, props.contractData]);

  return(
    <div>
      <div className="form">
        <Grid container>
          <Grid item xs={2}>
            <LogoDrop
              file={metadata.logo}
              onChange={handleChange("metadata.logo")}
            />
          </Grid>
          <Grid item xs={10}>
            <InputBase
              fullWidth
              value={metadata.name || ""}
              className="borderHover inputH2"
              placeholder="Name"
              onChange={handleChange("metadata.name")}
              startAdornment={
                <React.Fragment>
                  <InputAdornment position="start">
                    <Registry single icon type={props.badges} />
                  </InputAdornment>
                </React.Fragment>
              }
              endAdornment={
                <React.Fragment>
                  <InputAdornment position="end" className="badgeIcon action">
                    <Edit fontSize="inherit" />
                  </InputAdornment>
                </React.Fragment>
              }
            />
            <FormComponent
              value={metadata.url || ""}
              defaultValue="https://spankchain.com"
              type="url"
              placeholder={"Website"}
              onChange={handleChange("metadata.url")}
            />
            <FormComponent
              fullWidth
              multiline
              rowsMax="5"
              placeholder={"Description"}
              value={metadata.description || ""}
              defaultValue="SpankChain is a revolutionary blockchain based economic and technological infrastructure for the adult industry. Built on Ethereum, our smart contracts allow us to eliminate third party intermediaries and unfair payment practices while providing more powerful privacy and security."
              className="multilineHover"
              onChange={handleChange("metadata.description")}
            />
            <h2>
              Contact Information
              <hr />
            </h2>
            {Object.keys(metadata.contact).map((key: string) => {
              return (
                <FormComponent
                  key={key}
                  value={metadata.contact[key] || ""}
                  deletable
                  onDelete={() => {}}
                  label={key}
                  onChange={handleChange(`metadata.contact.${key}`)}
                />
              );
            })}
            <h2>
              Contract Details
              <hr />
            </h2>
            <p className="sectionDescription">
              Contract details allow users to validate and trust the source code
              of your contracts. If you are using Radspec this also enables you
              to use Human Readable Machine Verifyable transactions.
            </p>
            <FormComponent
              file={data.contract.abi}
              label="abi"
              upload
              value={data.contract.abi || ""}
              onDelete={() => {}}
              onUpload={handleChange("data.contract.abi")}
              accept="application/json"
            />
            <FormComponent
              label="source"
              upload
              file={data.contract.source}
              value={data.contract.source || ""}
              onDelete={() => {}}
              onUpload={handleChange("data.contract.source")}
              accept=".sol"
            />
            <FormComponent
              label="compiler"
              value={data.contract.compiler || ""}
              onChange={handleChange("data.contract.compiler")}
            />
            <FormComponent
              label="language"
              defaultValue="Solidity"
              value={data.contract.language || ""}
              onChange={handleChange("data.contract.language")}
            />
            <FormComponent
              label="optimizer"
              defaultValue="200"
              value={data.contract.optimizer || ""}
              onChange={handleChange("data.contract.optimizer")}
            />
            <FormComponent
              label="swarm"
              value={data.contract.swarm || ""}
              onChange={handleChange("data.contract.swarm")}
            />
            <FormComponent
              label="constructor"
              value={data.contract.constructor_arguments || ""}
              onChange={handleChange(
                "metadata.contract.constructor_arguments",
              )}
            />
            <h2>
              Reputation
              <hr />
            </h2>
            <p className="sectionDescription">
              Reputation is attributed by ETH Registry, malicious sites that are
              reported to us will be tagged as malicious upon further
              investigation. This allows wallets to better protect users from
              malicious actors and creates a way for good actors to distinguish
              themselves by providing transparency.
            </p>
            <div className="formbadges">
              <Registry type={props.badges} />
            </div>
            <FormComponent
              label="Status"
              className="reputation"
              value={
                props.badges.includes("malicious")
                  ? "Blocked"
                  : props.badges.includes("verified")
                    ? "Trusted"
                    : "Neutral"
              }
              disabled
              style={{
                color: props.badges.includes("malicious")
                  ? "#eb5757"
                  : props.badges.includes("verified")
                    ? "#27ae60"
                    : "#bdbdbd",
              }}
            />
            <FormComponent
              className="reputation"
              label="Curated by"
              value="Ethtective, WalletConnect"
              disabled
            />
            <FormComponent
              className="reputation"
              label="Description"
              value={contractdata.description}
              disabled
            />
            <FormComponent
              className="reputation inputmono"
              label="Submitted by"
              value={contractdata.submitter || ""}
              disabled
            />
          </Grid>
        </Grid>
        <div className="badges">
          <Registry single type={props.badges} />
        </div>
      </div>
    </div>
  );
}


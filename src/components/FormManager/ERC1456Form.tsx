import React, { useState, useEffect, createRef } from 'react';
import styled from 'styled-components';
import { registry } from '../../contexts';
import { useWeb3React } from '@web3-react/core';
import Edit from "@material-ui/icons/Edit";
import { Button, Tooltip, Grid, InputBase, InputAdornment } from '@material-ui/core';
import { ButtonRow } from '../../theme/components';

// TODO: deprecate these components to be uncontrolled and make this HOC manage the state for submission
import FormComponent from "./FormComponent";
import LogoDrop from "./LogoDrop";
import Registry from "./Registry"; //single priority icon
import axios from "axios";

const Byline = styled.h2`
  ${({ theme }) => theme.bylineText }
  margin-top: 4rem;
  border-bottom: 1px solid hsla(0,0%,0%,0.07);
  line-height: 2.5;
`;

// Existing entries:
// http://localhost:3000/edit/0x267be1c1d684f78cb4f6a176c4911b741e4ffdc0 kraken
// http://localhost:3000/edit/0x42d6622dece394b54999fbd73d108123806f6a18 spankchain
// http://localhost:3000/edit/0x6090a6e47849629b7245dfa1ca21d94cd15878ef ens

export default function ERC1456Form(props: any) {
  const { account } = useWeb3React();
  const erc1456Form = createRef<HTMLDivElement>();
  const [price, setPrice] = useState({
    eth: 0,
    usd: 0
  });

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

  // TODO: have this component manage the form state
  const handleSubmit = (evt: any) => {
    evt.preventDefault();
  }

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

  async function getUSD() {
    return axios
      .get(
        `https://api.etherscan.io/api?module=stats&ohai&action=ethprice&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`,
      )
      .then(function(response) {
        return parseFloat(response.data.result.ethusd);
      })
      .catch(function(error) {
        console.log(error);
        return 0;
      });
  }

  useEffect(() => {
    async function getPrice() {
      if (account) {
        const inEth = await registry.price();
        const usd = await getUSD();
        setPrice({
          eth: inEth,
          usd: parseFloat((inEth * usd).toFixed(3))
        });
      }
    }

    async function getCuratedData(contractdata:any) {
      if (populateEditor(contractdata)) {
        // this.props.setType(contractdata);
      } else {
        clearEditor();
      }
    }

    if (props.contractData !== {}) {
      getCuratedData(props.contractData);
    }

    getPrice();
  }, [props.editAddress, props.contractData, account]);


  return(
    <div>
      <div ref={erc1456Form} className="form">
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
              className="multilineHover"
              onChange={handleChange("metadata.description")}
            />
            {Object.keys(metadata.contact).length > 0 ?
              <Byline>
                Contact Information
                <hr />
              </Byline> : null
            }
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
            <Byline>
              Contract Details
              <hr />
            </Byline>
            <p className="sectionDescription">
              Contract details allow users to validate and trust the source code
              of your contracts. If you are using Radspec this also enables you
              to use Human Readable transactions.
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
              value={data.contract.language || ""}
              onChange={handleChange("data.contract.language")}
            />
            <FormComponent
              label="optimizer"
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
            <Byline>
              Reputation
              <hr />
            </Byline>
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
      <ButtonRow className="button-aligner">
        <Tooltip
          title={
            !props.canEdit ? "Can't submit: account is not a curator" : ""
          }
          enterDelay={200}
          leaveDelay={200}
        >
          <span style={{margin: "1rem"}}>
            <Button
              disabled={!props.canEdit}
              size="small"
              variant="contained"
              color="secondary"
              style={{ color: "white" }}
              onClick={handleSubmit}
            >
              Submit Metadata
            </Button>
          </span>
        </Tooltip>
        <Tooltip
          title={(props.canEdit ? 0 : price.eth) + " Ξ"}
          enterDelay={200}
          leaveDelay={200}
        >
        <span>
          <Button variant="outlined" disabled size="small">
            ~ $ {props.canEdit ? 0 : price.usd}
          </Button>
        </span>
        </Tooltip>
      </ButtonRow>
    </div>
  );
}

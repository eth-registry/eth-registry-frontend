import React, { useContext } from "react";
import { MetadataRegistryAddress } from '../../constants/';
import { ActiveFormContext } from '../../contexts';
import { Schemas } from '../../types/Schemas';
import { Body } from '../../theme/components';

export default function Information() {
  const activeForm = useContext(ActiveFormContext);

  function renderInfo() {
    if (activeForm === Schemas.GENERIC) {
      return (
        <Body>
          <b>Metadata Contract:</b>{" "}
          <a
            href={"http://canary.ethtective.com/" + MetadataRegistryAddress}
            target="_blank"
            rel="noopener noreferrer"
          >
            <code>{MetadataRegistryAddress}</code>
          </a><br/>
          <span>
            There are three methods available to you as a delegate:<br/><br />
            - <code>updateEntry(address, digest, hashFunction, size)</code><br />- <code>setDelegate(address, address)</code><br />- <code>clearEntry(address)</code><br /><br />
            As you can see the API require us to use multihash format, this is to reduce gas costs and future-proof the hash format. More schemas soon to come such as ERC721/ERC1456. <br />
              Set the delegate to {" "}<code>0xFFfFfFffFFfffFFfFFfFFFFFffFFFffffFfFFFfF</code> enable any Ethereum address publishing rights. Hope you know what you're doing...<br /><br />
            If not, be sure to check out the <a href={"https://github.com/corydickson/eth-metadata-registry/blob/master/README.md"} target="_blank" rel="noopener noreferrer">docs</a>.
          </span>
        </Body>
      );
    }

    if (activeForm === Schemas.ERC1456) {
      return (
        <Body>
          You can retrieve the metadata stored by calling
          <code>.getByAddress(address)</code> method. If metadata
          is available, JSON can be retrieved by looking up the IPFS
          address. This function returns the following tuple: <br />
          <code>
            (<span style={{ color: "#DA4C8A" }}>address</span> address,{" "}
            <span style={{ color: "#DA4C8A" }}>string</span> name,{" "}
            <span style={{ color: "#DA4C8A" }}>string</span> ipfsHash,{" "}
            <span style={{ color: "#DA4C8A" }}>bool</span> isSelfAttested,{" "}
            <span style={{ color: "#DA4C8A" }}>bool</span> isCurated,{" "}
            <span style={{ color: "#DA4C8A" }}>address</span> submittedBy)
          </code>
          <br /><br />
          <a href="https://ethereum-magicians.org/t/erc-1456-address-metadata-json-schema/">
             <b>View the EIP 1456 (Address Metadata JSON Specification)</b>
          </a>
        </Body>
      );
    }

    return null;
  }

  return (
    <>
      {renderInfo()}
    </>
  );
}



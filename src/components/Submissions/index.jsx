import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { LinearProgress } from '@material-ui/core';
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import { Schemas } from '../../types/Schemas';
import EthRegistry from '../../helpers/registry.js';

const ENTRIES_QUERY = gql`
  query getLatestEntries {
    entries(first: 10) {
      id
      count
      contractAddress
      delegate
    }
  }
`;

const registry = new EthRegistry(null);

export default function Submissions(props) {
  const [submissions, setSubmissions] = useState({
    recent: [],
    history: []
  });

  useEffect(() => {
    async function fetchRecent() {
      if (props.activeForm == Schemas.ERC1456) {
        let response = await registry.getHistory();
        let recent = [];
        for (let r of response) {
          let data = await registry.get(r[0]);
          data.key = r.key;
          recent.push(data);
        }

        setSubmissions({
          ...submissions,
          recent: recent
        });
      }
    }
    fetchRecent();
  }, [props.activeForm]);

  function renderSubmissions() {
    if (props.activeForm) {
      if (props.activeForm === Schemas.ERC1456) {
        return (
          <>
            {submissions.recent.map(sub => {
              if (!sub.data) return "";
              return (
                <div key={sub.key} className="historyItem">
                  <img src={sub.data.metadata.logo} alt="submission_icon" />{" "}
                  <span>
                    <a href={"https://ethregistry.org/edit/" + sub.data.address}>
                      {sub.name}
                    </a>{" "}
                    <br />
                    <code>
                      <a href={"https://www.ethtective.com/" + sub.address}>
                        {sub.address}
                      </a>
                    </code>
                  </span>
                </div>
              );
          })}
          </>
        );
      }

      if (props.activeForm === Schemas.GENERIC) {
        return (
          <Query query={ENTRIES_QUERY} >
            {({ data, error, loading }) => {
              return loading ? (
                <LinearProgress variant="query" style={{ width: '100%' }} />
              ) : error ? (
                <div>{JSON.stringify(error, undefined, 2)}</div>
              ) : (
                <div>{data.entries.map(({id, count, contractAddress, delegate}) => (<div>{id+count+contractAddress+delegate}</div>))}</div>
              )
            }}
          </Query>
        );
      }
    }
    return null;
  }

  return(
    <>
      {renderSubmissions()}
    </>
  );
}

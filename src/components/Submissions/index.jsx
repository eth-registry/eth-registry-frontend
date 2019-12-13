import React from "react";
import styled from 'styled-components';
import { LinearProgress } from '@material-ui/core';
import { gql } from "apollo-boost";
import { Query } from "react-apollo";

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

export default function Submissions() {
  return(
    <>
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
    </>
  );
}

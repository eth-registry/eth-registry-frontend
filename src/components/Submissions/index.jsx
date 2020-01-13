import React, { useContext, useState, useEffect } from "react";
import styled from 'styled-components';
import { ActiveFormContext } from '../../contexts';
import { LinearProgress } from '@material-ui/core';
// import { gql } from "apollo-boost";
// import { Query } from "react-apollo";
import { Byline } from '../../theme/components';
import { Schemas } from '../../types/Schemas';
import { registry } from '../../contexts';

const HistoryItem = styled.div`
  width: 430px;
  position: relative;
  margin-bottom: 1rem;
  ${({ theme }) => theme.bodyText }
  img {
    width: 16px;
    height: 16px;
    position: relative;
    left: 0px;
    margin: 0 2px 0 0;
  }

  span {
    position: relative;
    left: 5px;
    top: -2px;
  }

  span code {
    position: relative;
    left: 21px;
  }
`;

const Wrapper = styled.div`
  margin: 0 auto;
  overflow:hidden;
  width:min-content;
`
/**
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
**/

export default function Submissions(props) {
  const activeForm = useContext(ActiveFormContext);

  const [submissions, setSubmissions] = useState({
    recent: [],
    history: [],
    isLoading: true,
  });

  useEffect(() => {
    async function fetchRecent() {
      if (activeForm === Schemas.ERC1456) {
        let response = await registry.getHistory();
        let recent = [];
        for (let r of response) {
          let data = await registry.get(r[0]);
          data.key = r.key;
          recent.push(data);
        }

        setSubmissions(s => (
          {
            ...s,
            recent: recent,
            isLoading: false
          }
        ));
      }
    }
    fetchRecent();
  }, [activeForm]);

  function renderCurated() {
    if (submissions.isLoading) {
      return <LinearProgress variant="query" style={{ width: '80%' }} />
    }
    else {
      return (
        <Wrapper>
          {submissions.recent.map((sub, i)=> {
            if (!sub.data) return "";
            return (
              <HistoryItem key={i}>
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
              </HistoryItem>
            );
          })}
        </Wrapper>
      );
    }
  }

  function renderSubmissions() {
    if (activeForm) {
      if (activeForm === Schemas.ERC1456) {
        return (
          <>
            {renderCurated()}
          </>
        );
      }

      /**
      if (activeForm === Schemas.GENERIC) {
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
      } **/
    }
    return null;
  }

  return(
    <>
      <Byline>Recent Submissions</Byline>
      {renderSubmissions()}
    </>
  );
}

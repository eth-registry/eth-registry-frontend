import React from 'react';
import styled from 'styled-components';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import { useEagerConnect, useInactiveListener } from '../../hooks';
import { connectorsByName } from '../../connectors';

const StatusButton = styled.button`
  flex-row: no-wrap;
  width: 100%;
  font-size: 0.9rem;
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

const StatusError = styled(StatusButton)`
  background-color: red;
  border: 1px solid red;
  color: white;
  font-weight: 500;
  :hover,
  :focus {
    background-color: red;
  }
`;

const Text = styled.p`
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 0.5rem 0 0.25rem;
  font-size: 0.83rem;
`;

export default function WalletStatus() {
  const { connector, activate, deactivate, account, error } = useWeb3React();
    // handle logic to recognize the connector currently being activated
    const [activatingConnector, setActivatingConnector] = React.useState()
    React.useEffect(() => {
      if (activatingConnector && activatingConnector === connector) {
        setActivatingConnector(undefined)
      }
    }, [activatingConnector, connector])
    
    // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
    const triedEager = useEagerConnect();

    // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
    useInactiveListener(!triedEager || !!activatingConnector);

  function getWeb3Status() {
    if (account) {
      return (
        <StatusButton
          onClick={() => {
            setActivatingConnector(false)
            deactivate()
          }}
        >
          <Text>{account}</Text>
        </StatusButton>
      )
    } else if (error) {
      return (
        <StatusError>
          <Text>{error instanceof UnsupportedChainIdError ? 'Wrong Network' : 'Error'}</Text>
        </StatusError>
      )
    } else {
      return (
        <StatusButton
          onClick={() => {
            setActivatingConnector(true)
            activate(connectorsByName['Injected'])
          }}
        >
          <Text>{('Connect to a Wallet')}</Text>
        </StatusButton>
      )
    }
  }

  return (
    <>
      {getWeb3Status()}
    </>
  );
}

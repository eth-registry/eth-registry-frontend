import React from 'react';
import styled from 'styled-components';
import WalletStatus from '../WalletStatus/';

const HeaderFrame = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const HeaderElement = styled.div`
  margin: 1.25rem;
  display: flex;
  min-width: 0;
  display: flex;
  align-items: center;
`;

const Link = styled.a`
  text-decoration:none;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  :hover {
    cursor: pointer;
  }

  #title {
    display: inline;
    font-size: 1rem;
    font-weight: 500;
  }
`

export default function Header() {
  return (
    <HeaderFrame>
      <HeaderElement>
        <Title>
          <Link href="https://ethregistry.org">
            <h1 id="title">ETHRegistry</h1>
          </Link>
        </Title>
      </HeaderElement>
      <HeaderElement>
        <WalletStatus />
      </HeaderElement>
    </HeaderFrame>
  )
}

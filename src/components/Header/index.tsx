import React from 'react';
import styled from 'styled-components';
import WalletStatus from '../WalletStatus/';
import { Link } from 'react-router-dom'; 
import logo from '../../assets/logo_new.png';

const HeaderFrame = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const HeaderElement = styled.div`
  margin: 1.25rem;
  display:flex;
  min-width: 0;
  align-items: center;
`;

const StyledLink = styled(Link)`
  text-decoration:none;

  :visited {
    text-decoration:none;
    color: black;
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  :hover {
    cursor: pointer;
  }

  #title {
    display: inline-block;
    font-size: 1.25rem;
    padding: 6px;
    font-weight: 500;
    vertical-align: middle;
    font-family: "Raleway";
    font-style:italic;
    letter-spacing: 0.1rem;
  }
`

const Logo = styled.img`
  width: 48px;
  height: 48px;
  vertical-align: middle;
`

export default function Header() {
  return (
    <HeaderFrame>
      <HeaderElement>
        <Title>
          <StyledLink to="/">
            <Logo src={logo} alt="logo" />
            <h1 id="title">ETHRegistry</h1>
          </StyledLink>
        </Title>
      </HeaderElement>
      <HeaderElement>
        <WalletStatus />
      </HeaderElement>
    </HeaderFrame>
  )
}

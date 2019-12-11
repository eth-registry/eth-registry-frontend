import React from "react";
import styled from 'styled-components';
import gh from '../../assets/gh_icon.png';
import tw from '../../assets/tw_icon.svg';
import npm from '../../assets/npm_icon.svg';
import discord from '../../assets/discord_icon.svg';

const links = {
  'https://github.com/ethregistry': gh,
  'https://twitter.com/ethregistry': tw,
  'https://npm.com/ethregistry': npm,
  'https://discord.com/ethregistry': discord,
};

const IconRow = styled.div`
  text-align: center;
  margin: 1rem auto;
  overflow: hidden;
  width: 208px;
`;

const Icon = styled.img`
  margin: 10px;
  width: 32px;
  height: 32px;
  display:block;
  float: left;
  cursor:pointer;
`;

export default function Footer() {

  function renderLinks() {
    let Icons = [];
    for (let link in links) {
      const src = links[link];
      Icons.push(<a href={link} target="_blank" rel="noopener noreferrer"><Icon src={src} /></a>);
    }
    return Icons;
  }

  return(
    <IconRow>
      {renderLinks()}
    </IconRow>
  );
}


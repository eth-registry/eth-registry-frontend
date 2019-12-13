import React from "react";
import styled from 'styled-components';
import gh from '../../assets/gh_icon.png';
import tw from '../../assets/tw_icon.svg';
import npm from '../../assets/npm_icon.svg';
import discord from '../../assets/discord_icon.svg';
import reddit from '../../assets/reddit_icon.svg';

const links = {
  'https://github.com/eth-registry': gh,
  'https://twitter.com/ethregistry': tw,
  'https://npm.com/ethregistry': npm,
  'https://discord.gg/ZtfGyKZ': discord,
  'https://reddit.com/r/ethregistry': reddit,
};

const iconMargin = 10;
const iconWH = 32;
const rowLength = ((2 * iconMargin) + iconWH) * Object.keys(links).length;

const IconRow = styled.div`
  text-align: center;
  margin: 1rem auto;
  overflow: hidden;
  width: ${rowLength}px;
`;

const Icon = styled.img`
  margin: ${iconMargin}px;
  width: ${iconWH}px;
  height: ${iconWH}px;
  display:block;
  float: left;
  cursor:pointer;
`;

export default function Footer() {
  return (
    <IconRow>
      {Object.keys(links).map((link, idx) => {
        return(<a key={idx} href={link} target="_blank" rel="noopener noreferrer"><Icon src={links[link]} /></a>);
      })}
    </IconRow>
  );
}


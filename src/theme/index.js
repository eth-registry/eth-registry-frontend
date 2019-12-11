import React from 'react';
import { ThemeProvider as StyledComponentsThemeProvider, css } from 'styled-components';
import { createMuiTheme } from '@material-ui/core';

const MEDIA_WIDTHS = {
    upToSmall: 600,
    upToMedium: 960,
    upToLarge: 1280
};

const mediaWidthTemplates = Object.keys(MEDIA_WIDTHS).reduce((accumulator, size) => {
    accumulator[size] = (...args) => css`
      @media (max-width: ${MEDIA_WIDTHS[size]}px) {
        ${css(...args)}
      }
    `
    return accumulator
}, {});

const white = '#FFFFFF'
const black = '#000000'

const theme = createMuiTheme({
    white,
    black,
    typography: {
      fontFamily: 'Raleway, Arial',
      body1: {
        fontFamiliy: 'Tomorrow',
        fontWeight: 800,
        fontSize: "0.9rem",
        letterSpacing: "0.06rem"
      }
    },
    bylineText: css`
      font-size:2rem;
      font-weight:100;
      font-family: 'Tomorrow', sans-serif;
      text-align: center;
    `,
    bodyText: css`
      font-size: 0.9rem;
      position: relative;
      font-weight:800;
      letter-spacing: 0.06rem;
      font-family: 'Tomorrow', sans-serif;
    `,
    headerText: css`
      font-size: 1.25rem;
      font-weight: 500;
      font-family: "Raleway";
      font-style:italic;
      letter-spacing: 0.1rem;
    `,
});

export default function ThemeProvider({ children }) {
    return <StyledComponentsThemeProvider theme={theme}>{children}</StyledComponentsThemeProvider>
}

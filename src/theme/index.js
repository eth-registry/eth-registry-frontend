import React from 'react';
import { ThemeProvider as StyledComponentsThemeProvider, css } from 'styled-components';

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

const theme = () => ({
    white,
    black,
})

export default function ThemeProvider({ children }) {
    return <StyledComponentsThemeProvider theme={theme}>{children}</StyledComponentsThemeProvider>
}
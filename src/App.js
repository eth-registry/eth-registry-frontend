import React, { Component } from "react";
import Typography from "typography";
import githubTheme from "typography-theme-github";
import EthRegistry from "eth-registry";
import Main from "./components/main";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

githubTheme.headerFontFamily = ["Roboto", "sans-serif"];
githubTheme.bodyFontFamily = ["Roboto", "sans-serif"];
githubTheme.headerWeight = 300;
githubTheme.bodyWeight = 300;

githubTheme.overrideThemeStyles = ({ rhythm }, options) => ({
  "h1,h2,h3,h4": {
    fontWeight: 300,
    textAlign: "center",
    color: "#43413d",
  },
  h1: {
    border: "none",
    fontSize: "5.3rem",
    marginTop: "2.6rem",
  },
  h2: {
    fontSize: "2rem",
    marginBottom: "calc(2rem - 1px)",
    paddingBottom: "calc(2rem - 1px)",
    fontWeight: 300,
    color: "#423F36",
    marginTop: "6rem",
  },
  h3: {
    border: "none",
    textTransform: "uppercase",
    fontSize: "0.75rem",
    fontWeight: 300,
    color: "#423F36",
    letterSpacing: "0.2rem",
  },
  body: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      "Segoe UI",
      "Roboto",
      "Oxygen",
      "Ubuntu",
      "Helvetica Neue",
      "Arial",
      "sans-serif",
    ].join(","),
    fontWeight: 300,
    marginTop: "12.5rem",
  },
  button: {
    boxShadow: "none",
  },
});

let ethregistry = {};

const theme = createMuiTheme({
  palette: {
    primary: { light: "#00ffd9", main: "#00ffd9", dark: "#00ffd9" },
    secondary: { light: "#F44A24", main: "#F44A24", dark: "#F44A24" },
    tertiary: { light: "green", main: "green", dark: "green" },
  },
  typography: {
    useNextVariants: true,
  },
});

const typography = new Typography(githubTheme);
typography.injectStyles();

class App extends Component {
  constructor(props) {
    super(props);
    ethregistry = new EthRegistry();
  }

  componentWillMount() {}

  render() {
    return (
      <div className="App">
        <MuiThemeProvider theme={theme}>
          <Header ethregistry={ethregistry} />
          <Main
            params={this.props.match.params}
            location={this.props.location}
            ethregistry={ethregistry}
          />
          <Footer metadata={ethregistry} />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;

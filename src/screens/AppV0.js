import React, { Component } from "react";
import Main from "../components/v0/main.js";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { Theme } from '../theme.js';

class App extends Component {
  componentWillMount() {
    console.log(this.props.match.params);
  }

  render() {
    return (
      <div className="App">
        <MuiThemeProvider theme={Theme}>
          <Main params={this.props.match.params} />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;

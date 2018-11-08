import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ReactGA from "react-ga";

const google_analytics =
  process.env.REACT_APP_GOOGLE_ANALYTICS || "UA-00000000-0";

ReactGA.initialize(google_analytics);
ReactGA.pageview(window.location.pathname + window.location.search);

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/edit/:address" component={App} />
      <Route path="/edit/:address" component={App} />
      <Route
        path="/submit/:address"
        render={props => <App location="submit" />}
      />
      <Route component={App} />
    </Switch>
  </Router>,
  document.getElementById("root"),
);
registerServiceWorker();

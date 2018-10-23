import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  popper: {
    opacity: 1
  },
  lightTooltip: {
    background: "#fefefe",
    color: theme.palette.text.primary,
    boxShadow:
      "0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 3px 2px 0px rgba(0, 0, 0, 0.01), 0px 3px 1px -2px rgba(0, 0, 0, 0.01)",
    fontFamily: "Hack, Source Code Pro",
    fontSize: 9,
    opacity: 1
  }
});

class SimpleTooltip extends React.Component {
  render() {
    return <div />;
  }
}

export default withStyles(styles)(SimpleTooltip);

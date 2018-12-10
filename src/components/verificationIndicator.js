import React from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Locked from "@material-ui/icons/Lock";

const styles = theme => ({
  popper: {
    opacity: 1,
  },
  lightTooltip: {
    background: "#fefefe",
    color: theme.palette.text.primary,
    boxShadow:
      "0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 3px 2px 0px rgba(0, 0, 0, 0.01), 0px 3px 1px -2px rgba(0, 0, 0, 0.01)",
    fontFamily: "Hack, Source Code Pro",
    fontSize: 9,
    opacity: 1,
  },
});

class Indicator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
    };
  }

  render() {
    let title = "";
    let color = "#fff";
    let label = "";
    let text = "";
    let icon = "";

    if (this.props.type === "verified_self") {
      title =
        "Once you submit this metadata, it can no longer be changed from another address";
      color = "#AFEA4F";
      label = "You are verified to be the owner of this address.";
      text = "Verified";
      icon = <VerifiedUser />;
    }

    if (this.props.type === "verified") {
      title = "This metadata was submitted by the owner of this address";
      color = "#AFEA4F";
      label = "You are verified to be the owner of this address.";
      text = "Verified";
      icon = <VerifiedUser />;
    }

    if (this.props.type === "curated") {
      title =
        "Metadata for this address is locked and can only be changed by the appropriate curator";
      color = "#00E1D9";
      label = "This address is curated";
      text = "Curated";
      icon = <Locked />;
    }

    return (
      <Tooltip
        title={title}
        classes={{
          tooltip: this.props.classes.lightTooltip,
          popper: this.props.classes.popper,
        }}
        enterDelay={200}
        leaveDelay={200}
      >
        <InputAdornment
          position="end"
          style={{
            color: color,
            fontWeight: 400,
          }}
          aria-label={label}
        >
          {text} {icon}
        </InputAdornment>
      </Tooltip>
    );
  }
}

export default withStyles(styles)(Indicator);

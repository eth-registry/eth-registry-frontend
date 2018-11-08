import React from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import CircularProgress from "@material-ui/core/CircularProgress";

class LoadingIndicator extends React.Component {
  render() {
    return (
      <InputAdornment
        position="end"
        style={{
          color: "red",
          fontWeight: 400,
        }}
        aria-label="loading"
      >
        {this.props.loading ? <CircularProgress /> : ""}
      </InputAdornment>
    );
  }
}

export default LoadingIndicator;

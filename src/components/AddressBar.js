import React, { Component } from "react";

import Registry from "./Registry";

export default class AddressBar extends Component {
  render() {
    return (
      <div class="monospace address">
        <div class="barBadges">
          <Registry type={this.props.badges} icon />;
        </div>
        <div class="barAddress">{this.props.address}</div>
      </div>
    );
  }
}

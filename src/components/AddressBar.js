import React, { Component } from "react";

import ColoredIcon from "./ColoredIcon";

export default class AddressBar extends Component {
    render() {
        return (
            <div class="monospace address">
                <div class="barBadges">
                    {this.props.badges.map(key => {
                        return <ColoredIcon type={key} />;
                    })}
                </div>
                <div class="barAddress">{this.props.address}</div>
            </div>
        );
    }
}

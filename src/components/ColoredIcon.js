import React, { Component } from "react";

import VerifiedUser from "@material-ui/icons/People";
// import VerifiedUser from "@material-ui/icons/HowToReg";
import SelfAttested from "@material-ui/icons/RecordVoiceOver";
import Info from "@material-ui/icons/ErrorOutline";
import Lock from "@material-ui/icons/MicOff";
import Edit from "@material-ui/icons/Edit";
import Warning from "@material-ui/icons/Warning";

export default class ColoredIcon extends Component {
    renderIcon(type) {
        switch (type) {
            case "verified":
                return (
                    <span className="badgeIcon verified">
                        <VerifiedUser />
                    </span>
                );
            case "scam":
                return (
                    <span className="badgeIcon scam">
                        <Warning />
                    </span>
                );
            case "self":
                return (
                    <span className="badgeIcon selfAttested">
                        <SelfAttested />
                    </span>
                );
            case "info":
                return (
                    <span className="badgeIcon info">
                        <Info />
                    </span>
                );
            case "locked":
                return (
                    <span className="badgeIcon curated">
                        <Lock />
                    </span>
                );
        }
    }

    render() {
        return this.renderIcon(this.props.type);
    }
}

class AddressBar extends Component {}

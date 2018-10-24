import React, { Component } from "react";

import VerifiedUser from "@material-ui/icons/People";
// import VerifiedUser from "@material-ui/icons/HowToReg";
import SelfAttested from "@material-ui/icons/RecordVoiceOver";
import Info from "@material-ui/icons/ErrorOutline";
import Lock from "@material-ui/icons/MicOff";
import Edit from "@material-ui/icons/Edit";
import Warning from "@material-ui/icons/Warning";

export default class RegistryBadge extends Component {
    priorityType(type) {
        if (type.includes("scam")) return "scam";
        if (type.includes("verified")) return "verified";
        if (type.includes("self")) return "self";
        if (type.includes("info")) return "info";
        if (type.inclused("locked")) return "locked";
        return null;
    }

    renderBadge(type) {
        switch (type) {
            case "scam":
                return (
                    <div className="badge scam">
                        Malicious <Warning />
                    </div>
                );
            case "locked":
                return (
                    <div className="badge curated">
                        Locked <Lock />
                    </div>
                );
            case "self":
                return (
                    <div className="badge selfAttested">
                        Self Attested <SelfAttested />
                    </div>
                );
            case "verified":
                return (
                    <div className="badge verified">
                        Verified <VerifiedUser />
                    </div>
                );
            case "info":
                return (
                    <div className="badge info">
                        Hearsay <Info />
                    </div>
                );
            default:
                return <React.Fragment />;
        }
    }

    render() {
        let { type } = this.props;
        let badges = this.props.single ? [this.priorityType(type)] : type;
        return badges.map(key => {
            return this.renderBadge(key);
        });
    }
}

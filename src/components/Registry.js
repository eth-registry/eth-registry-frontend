import React, { Component } from "react";

import VerifiedUser from "@material-ui/icons/People";
// import VerifiedUser from "@material-ui/icons/HowToReg";
import SelfAttested from "@material-ui/icons/RecordVoiceOver";
import Info from "@material-ui/icons/ErrorOutline";
import Lock from "@material-ui/icons/MicOff";
import Edit from "@material-ui/icons/Edit";
import Warning from "@material-ui/icons/Warning";

export default class Registry extends Component {
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
        let { type, icon, single } = this.props;
        let series = single ? [this.priorityType(type)] : type;
        return series.map(key => {
            return icon ? this.renderIcon(key) : this.renderBadge(key);
        });
    }
}

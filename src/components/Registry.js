import React, { Component } from "react";

import VerifiedUser from "@material-ui/icons/SupervisorAccount";
// import VerifiedUser from "@material-ui/icons/People";
// import VerifiedUser from "@material-ui/icons/HowToReg";
import SelfAttested from "@material-ui/icons/RecordVoiceOver";
import Info from "@material-ui/icons/ErrorOutline";
import Lock from "@material-ui/icons/MicOff";
import Edit from "@material-ui/icons/Edit";
import Warning from "@material-ui/icons/Warning";

const registryTypes = [
    {
        type: "scam",
        text: "Malicious",
        icon: <Warning />,
        description: "This address is regarded to be Malicous by ETH Registry",
        color: "#eb5757",
        priority: 10,
    },
    {
        type: "verified",
        text: "Verified",
        icon: <VerifiedUser />,
        description:
            "Metadata for this address has been verified by ETH Registry",
        color: "#27ae60",
        priority: 7,
    },
    {
        type: "self",
        text: "Self Attested",
        icon: <SelfAttested />,
        description:
            "Metadata for this address was submitted by the owner of this address, it could be false or misleading",
        color: "#56ccf2",
        priority: 3,
    },
    {
        type: "info",
        text: "Hearsay",
        icon: <Info />,
        description:
            "Metadata for this address was submitted by an unknown party to the ETH Registry, it could be false or misleading",
        color: "#F2C94C",
        priority: 2,
    },
    {
        type: "locked",
        text: "Locked",
        icon: <Lock />,
        description:
            "This address is locked from further submissions on the ETH Registry",
        color: "#bdbdbd",
        priority: 1,
    },
];

const classes = {
    badge: {
        fontWeight: 600,
        fontSize: 12,
        color: "white",
        padding: "3px 8px 2px 8px",
        borderRadius: 5,
        marginRight: 10,
        boxShadow: "-26px 0px 0px 0px rgba(255, 255, 255, 0.3) inset",
        textShadow: "0px 0px 7px rgba(255, 255, 255, 0.2)",
        border: "1px solid rgba(255, 255, 255, 0.5)",
        cursor: "help",
        display: "inline-block",
    },
    icon: {
        fontWeight: 600,
        fontSize: 20,
        verticalAlign: "top",
        marginLeft: 8,
        paddingLeft: 4,
        marginRight: -3,
    },
};

export default class Registry extends Component {
    //TODO: map this to the priorities above
    priorityType(type) {
        if (type.includes("scam")) return "scam";
        if (type.includes("verified")) return "verified";
        if (type.includes("self")) return "self";
        if (type.includes("info")) return "info";
        if (type.inclused("locked")) return "locked";
        return null;
    }

    registryType(type) {
        for (let t of registryTypes) {
            if (t.type === type) {
                return t;
            }
        }
        return null;
    }

    renderBadge(type) {
        let t = this.registryType(type);
        if (t)
            return (
                <div
                    role="reputation badge"
                    className={`badge`}
                    title={t.description}
                    aria-label={t.description}
                    style={{ background: t.color }}
                >
                    {t.text} {t.icon}
                </div>
            );
        else return <React.Fragment />;
    }

    renderIcon(type) {
        let t = this.registryType(type);
        if (t)
            return (
                <span
                    role="reputation icon"
                    className={"badgeIcon"}
                    title={t.description}
                    aria-label={t.description}
                    style={{
                        color: t.color,
                        textShadow: `0px 0px 7px ${t.color}`,
                    }}
                >
                    {t.icon}
                </span>
            );
        else return <React.Fragment />;
    }

    render() {
        let { type, icon, single } = this.props;
        let series = single ? [this.priorityType(type)] : type;
        return series.map(key => {
            return icon ? this.renderIcon(key) : this.renderBadge(key);
        });
    }
}

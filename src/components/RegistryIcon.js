import React, { Component } from "react";

import ColoredIcon from "./ColoredIcon";

export default class RegistryIcon extends Component {
    priorityIcon(type) {
        if (type.includes("scam")) return "scam";
        if (type.includes("verified")) return "verified";
        if (type.includes("self")) return "self";
        if (type.includes("info")) return "info";
        if (type.inclused("locked")) return "locked";
        return null;
    }

    render() {
        const icon = this.priorityIcon(this.props.type);

        return icon ? <ColoredIcon type={icon} /> : <React.Fragment />;
    }
}

import React from "react";
import "../index.css";

export default class Recent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recent: [],
            history: [],
        };
    }

    componentDidMount() {
        this.getHistory();
    }

    async getHistory() {
        let response = await this.props.metadata.getHistory();
        let recent = [];
        for (let r of response) {
            let data = await this.props.metadata.getAddressData(r[0]);
            data.key = r.key;
            recent.push(data);
        }
        this.setState({ recent: recent });
    }

    render() {
        return (
            <div>
                {this.state.recent.map(sub => {
                    return (
                        <div key={sub.key} className="historyItem">
                            <img src={sub.data.metadata.logo} alt="submission_icon"/>{" "}
                            <span>
                                <a
                                    href={
                                        "https://theregistry.online/edit/" +
                                        sub.data.address
                                    }
                                >
                                    {sub.name}
                                </a>{" "}
                                <code>{sub.address}</code>
                            </span>
                        </div>
                    );
                })}
            </div>
        );
    }
}

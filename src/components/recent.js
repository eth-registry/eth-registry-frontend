import React from "react";
import "../index.css";
import Placeholder from "../assets/placeholder.png";

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
      if (recent.length >= 5) break;
    }
    this.setState({ recent: recent });
  }

  render() {
    return (
      <div>
        {this.state.recent.map(sub => {
          if (!sub.data) return "";
          return (
            <div key={sub.key} className="historyItem">
              <img
                src={sub.data.metadata.logo || Placeholder}
                alt="submission_icon"
              />{" "}
              <span>
                <a href={"https://ethregistry.org/edit/" + sub.data.address}>
                  {sub.name}
                </a>{" "}
                <br />
                <code>
                  <a href={"https://www.ethtective.com/" + sub.address}>
                    {sub.address}
                  </a>
                </code>
              </span>
            </div>
          );
        })}
      </div>
    );
  }
}

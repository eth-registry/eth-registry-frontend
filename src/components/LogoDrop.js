import React, { Component } from "react";
import MagicDropzone from "react-magic-dropzone";
import Avatar from "@material-ui/core/Avatar";
import Placeholder from "../assets/placeholder.png";

//60

export default class LogoDrop extends Component {
    state = {
        file: undefined,
    };
    submitFile = (accepted, rejected, links) => {
        if (rejected.length > 0) {
            // console.log(rejected);
            this.setState({
                open: true,
                notification: (
                    <span>
                        Couldn't upload your file, please make sure it is of the
                        following type:
                        <br />
                        image/jpeg, image/png, .jpg, .jpeg, .png, .svg
                    </span>
                ),
                variant: "error",
            });
        } else {
            this.setState({
                file: accepted[0],
            });
        }
    };

    render() {
        const file = this.state.file
            ? this.state.file.preview
            : this.props.file || undefined;
        return (
            <MagicDropzone
                accept="image/jpeg, image/png, .jpg, .jpeg, .png"
                onDrop={this.submitFile}
                className="dropmagic"
            >
                <Avatar
                    src={file || Placeholder}
                    className={"avatarDropzone" + (!file ? " empty" : "")}
                    style={{
                        width: 60,
                        height: 60,
                        borderRadius: 4,
                    }}
                />
            </MagicDropzone>
        );
    }
}

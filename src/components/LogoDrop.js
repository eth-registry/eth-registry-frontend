import React, { Component } from "react";
import MagicDropzone from "react-magic-dropzone";
import Avatar from "@material-ui/core/Avatar";

//60

export default class LogoDrop extends Component {
    state = {
        file: undefined,
        loadedFile: "unicorn.jpg",
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
        const empty = this.state.file
            ? this.state.file.preview
            : this.state.loadedFile || undefined;
        console.log();
        return (
            <MagicDropzone
                accept="image/jpeg, image/png, .jpg, .jpeg, .png"
                onDrop={this.submitFile}
                className="dropmagic"
            >
                <Avatar
                    alt="Adelle Charles"
                    src={empty || "placeholder.png"}
                    className={"avatarDropzone" + (empty ? " empty" : "")}
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

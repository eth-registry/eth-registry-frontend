import React, { Component } from "react";

import InputBase from "@material-ui/core/InputBase";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";

import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import Copy from "@material-ui/icons/FileCopy";
import Check from "@material-ui/icons/Check";

export default class FormComponent extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        key: parseInt(Math.random() * 99999),
    };
    renderUploader() {
        return (
            <React.Fragment>
                <input
                    accept={this.props.accept}
                    id={"flat-button-file" + this.state.key}
                    type="file"
                    style={{ display: "none" }}
                    onChange={e => {
                        this.setState({ file: e.target.files[0] });
                        this.props.onUpload(e.target.files[0]);
                    }}
                />
                <label htmlFor={"flat-button-file" + this.state.key}>
                    <InputBase
                        fullWidth
                        disabled
                        className={
                            this.props.className +
                            " " +
                            ("inputH4 dropzone" +
                                (this.props.file ? " empty" : ""))
                        }
                        startAdornment={
                            this.props.label ? (
                                <React.Fragment>
                                    <InputAdornment
                                        position="start"
                                        className="prefix"
                                    >
                                        {this.props.label}:{" "}
                                    </InputAdornment>
                                    <InputAdornment
                                        position="start"
                                        className={
                                            "dropzonecontent" +
                                            (this.props.file ? "" : " empty")
                                        }
                                    >
                                        {this.props.file !== undefined ? (
                                            this.props.file.name !==
                                            undefined ? (
                                                <div className="inputDropzone">
                                                    {this.props.file.name}
                                                </div>
                                            ) : (
                                                <div
                                                    className="inputDropzoneLink"
                                                    onClick={() => {
                                                        window.open(
                                                            "https://gateway.ipfs.io/ipfs/" +
                                                                this.props.file,
                                                        );
                                                    }}
                                                >
                                                    {this.props.file}
                                                </div>
                                            )
                                        ) : (
                                            <span className="dropzonetext">
                                                {"Click to upload"}
                                            </span>
                                        )}
                                    </InputAdornment>
                                </React.Fragment>
                            ) : (
                                ""
                            )
                        }
                        endAdornment={
                            this.props.file ? (
                                <React.Fragment>
                                    <InputAdornment
                                        position="end"
                                        className="action"
                                    >
                                        <Delete
                                            fontSize="inherit"
                                            onClick={e => {
                                                console.log(e);
                                                this.props.onDelete();
                                            }}
                                            aria-label="Delete item"
                                            title="Delete item"
                                        />
                                    </InputAdornment>
                                    <InputAdornment
                                        position="end"
                                        className="inputAdornment"
                                        style={{ color: "#27ae60" }}
                                    >
                                        <Check />
                                    </InputAdornment>
                                </React.Fragment>
                            ) : (
                                ""
                            )
                        }
                    />
                </label>
            </React.Fragment>
        );
    }

    render() {
        const { deletable, onDelete, ...props } = this.props;
        return this.props.upload ? (
            this.renderUploader()
        ) : (
            <InputBase
                fullWidth
                {...props}
                className={
                    this.props.className +
                    " " +
                    (this.props.multiline
                        ? "multilineHover"
                        : "inputH4" +
                          (!this.props.disabled ? " borderHover" : ""))
                }
                endAdornment={
                    !this.props.disabled && !this.props.multiline ? (
                        <React.Fragment>
                            <InputAdornment position="end" className="action">
                                <Edit
                                    fontSize="inherit"
                                    aria-label="Item can be edited"
                                    title="Item can be edited"
                                />
                            </InputAdornment>
                            <InputAdornment position="end" className="action">
                                <Copy
                                    fontSize="inherit"
                                    aria-label="Copy to clipboard"
                                    title="Copy to clipboard"
                                />
                            </InputAdornment>
                            {deletable ? (
                                <InputAdornment
                                    position="end"
                                    className="action"
                                >
                                    <Delete
                                        fontSize="inherit"
                                        onClick={() => this.props.onDelete()}
                                        aria-label="Delete item"
                                        title="Delete item"
                                    />
                                </InputAdornment>
                            ) : (
                                ""
                            )}
                        </React.Fragment>
                    ) : (
                        <React.Fragment />
                    )
                }
                startAdornment={
                    this.props.label ? (
                        <InputAdornment position="start" className="prefix">
                            {this.props.label}:{" "}
                        </InputAdornment>
                    ) : (
                        ""
                    )
                }
            />
        );
    }
}

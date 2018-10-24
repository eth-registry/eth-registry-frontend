import React, { Component } from "react";

import InputBase from "@material-ui/core/InputBase";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";

import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import Copy from "@material-ui/icons/FileCopy";
import Check from "@material-ui/icons/Check";

export default class FormComponent extends Component {
    renderUploader() {
        return (
            <InputBase
                fullWidth
                disabled
                className={
                    "inputH4 dropzone" +
                    (this.props.file === undefined ? " empty" : "")
                }
                defaultValue={
                    this.props.file !== undefined
                        ? this.props.file.name
                        : "Drag a file here or click to upload"
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
                endAdornment={
                    this.props.file !== undefined ? (
                        <React.Fragment>
                            <InputAdornment position="end" className="action">
                                <Delete
                                    fontSize="inherit"
                                    onClick={() => this.props.onDelete()}
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
                    this.props.multiline
                        ? "multilineHover"
                        : "inputH4" +
                          (!this.props.disabled ? " borderHover" : "")
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

import React, { Component } from "react";

import InputBase from "@material-ui/core/InputBase";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";

import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import Copy from "@material-ui/icons/FileCopy";

export default class FormComponent extends Component {
    render() {
        return (
            <InputBase
                fullWidth
                {...this.props}
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
                            {this.props.deletable ? (
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

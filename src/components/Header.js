import React, { Component } from "react";
import LogoTop from "../assets/logo_icon.png";
import "../css/header.css";

export default class Header extends Component {
    render() {
        return (
            <nav id="navigation">
                <div className="d-flex flex-justify-between px-3 ">
                    <div className="d-flex flex-justify-between ">
                        <div className="HeaderLogo">
                            <a href="/">
                                <img src={LogoTop} alt="logo_icon" />
                            </a>
                        </div>
                    </div>
                    <div className="HeaderMenu d-flex flex-justify-between flex-auto">
                        <div className="d-flex">
                            <input
                                className="header-search"
                                classes={{ underline: "underline" }}
                                autoComplete={"off"}
                                placeholder="Lookup address"
                                spellCheck="false"
                            />
                            <ul
                                className="d-flex pl-2 flex-items-center text-bold list-style-none"
                                role="navigation"
                            >
                                <li>
                                    <a
                                        className="HeaderNavlink px-2"
                                        data-hotkey="e s"
                                        aria-label="Submit Metadata"
                                        data-selected-links="/submit"
                                        href="/submit"
                                    >
                                        Submit Metadata
                                    </a>{" "}
                                </li>
                                <li>
                                    <a
                                        className="HeaderNavlink px-2"
                                        data-hotkey="e r"
                                        aria-label="Report Address"
                                        data-selected-links="/report"
                                        href="/report"
                                    >
                                        Report Address
                                    </a>{" "}
                                </li>
                            </ul>
                        </div>
                        <div className="d-flex" style={{ display: "none" }}>
                            <ul
                                className="user-nav d-flex flex-items-center list-style-none"
                                id="user-links"
                            >
                                <li>
                                    <a
                                        className="HeaderNavlink px-2"
                                        data-hotkey="g n"
                                        href="/notifications"
                                    >
                                        Connection
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

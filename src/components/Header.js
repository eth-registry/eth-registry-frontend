import React, { Component } from "react";
import InputBase from "@material-ui/core/InputBase";
import "../css/header.css";

export default class Header extends Component {
    render() {
        return (
            <nav id="navigation">
                <div className="d-flex flex-justify-between px-3 ">
                    <div className="d-flex flex-justify-between ">
                        <div className="HeaderLogo">
                            <img src="logo_icon.png" />
                        </div>
                    </div>
                    <div className="HeaderMenu d-flex flex-justify-between flex-auto">
                        <div className="d-flex">
                            <input
                                className="header-search"
                                classes={{ underline: "underline" }}
                                autoComplete={false}
                                placeholder="Lookup address"
                            />
                            <ul
                                className="d-flex pl-2 flex-items-center text-bold list-style-none"
                                role="navigation"
                            >
                                <li>
                                    <a
                                        className="js-selected-navigation-item HeaderNavlink px-2"
                                        data-hotkey="g p"
                                        data-ga-click="Header, click, Nav menu - item:pulls context:user"
                                        aria-label="Pull requests you created"
                                        data-selected-links="/pulls /pulls/assigned /pulls/mentioned /pulls"
                                        href="/pulls"
                                    >
                                        Submit Metadata
                                    </a>{" "}
                                </li>
                                <li>
                                    <a
                                        className="js-selected-navigation-item HeaderNavlink px-2"
                                        data-hotkey="g p"
                                        data-ga-click="Header, click, Nav menu - item:pulls context:user"
                                        aria-label="Pull requests you created"
                                        data-selected-links="/pulls /pulls/assigned /pulls/mentioned /pulls"
                                        href="/pulls"
                                    >
                                        Report Address
                                    </a>{" "}
                                </li>
                            </ul>
                        </div>
                        <div className="d-flex">
                            <ul
                                className="user-nav d-flex flex-items-center list-style-none"
                                id="user-links"
                            >
                                <li>
                                    <a
                                        className="js-selected-navigation-item HeaderNavlink px-2"
                                        data-hotkey="g n"
                                        data-ga-click="Header, go to notifications, icon:unread"
                                        data-channel="notification-changed:2925132"
                                        href="/notifications"
                                    >
                                        Connection
                                        <span className="mail-status unread" />
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

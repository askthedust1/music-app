import React from 'react';
import './nav.css';
import {NavLink} from "react-router-dom";

const Nav = () => {
    return (
        <div className="header header-wrap-one">
            <div className="container1 cf">
                <h1 className="logo">
                    <NavLink to="/"><img className="logo" src="https://i.ibb.co/MBNpPfK/1logo3.png" alt="1logo3" /></NavLink>
                </h1>
                <div className="navigation">
                    <ul>
                        <li>Home</li>
                        <li>About</li>
                        <li>Add new</li>
                        <li>Blog</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Nav;
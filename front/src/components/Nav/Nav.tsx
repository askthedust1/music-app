import React from 'react';
import './nav.css';

const Nav = () => {
    return (
        <div className="header header-wrap-one">
            <div className="container cf">
                <h1 className="logo">LOGO</h1>
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
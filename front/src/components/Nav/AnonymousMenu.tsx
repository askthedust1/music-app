import React from 'react';
import { NavLink } from 'react-router-dom';

const AnonymousMenu = () => {
    return (
        <ul>
            <NavLink className="list" to="/register">Sign up</NavLink>
            <NavLink className="list" to="/login">Sign in</NavLink>
        </ul>
    );
};

export default AnonymousMenu;
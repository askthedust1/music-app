import React from 'react';
import './nav.css';
import {NavLink} from "react-router-dom";
import {useAppSelector} from "../../app/hook";
import {selectUser} from "../../features/users/usersSlice";

const Nav = () => {
    const user = useAppSelector(selectUser);
    return (
        <div className="header header-wrap-one">
            <div className="container1 cf">
                <h1 className="logo">
                    <NavLink to="/"><img className="logo" src="https://i.ibb.co/MBNpPfK/1logo3.png" alt="1logo3" /></NavLink>
                </h1>
                <div className="navigation">
                    {
                        user ?
                            <ul>
                                <b className="list" style={{color: '#00E20B'}}>Hello, {user.username}!</b>
                                <NavLink className="list" to="/">Home</NavLink>
                                <NavLink className="list" to="/tracks_history">Tracks History</NavLink>
                                <li className="list">Add new</li>
                                <li className="list">Log Out</li>
                            </ul>
                            :
                            <ul>
                                <NavLink className="list" to="/register">Sign up</NavLink>
                                <NavLink className="list" to="/login">Sign in</NavLink>
                            </ul>
                    }

                </div>
            </div>
        </div>
    );
};

export default Nav;
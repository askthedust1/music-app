import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../app/hook';
import { logout } from '../../features/users/usersThunk';
import {User} from "../../types";

interface IProps {
    user: User;
}

const UserMenu: React.FC<IProps> = ({ user }) => {
    const dispatch = useAppDispatch();
    const handleLogout = () => dispatch(logout());

    return (
        <ul>
            <b className="list" style={{color: '#00E20B'}}>Hello, {user.username}!</b>
            <NavLink className="list" to="/">Home</NavLink>
            <NavLink className="list" to="/add_post">Add new</NavLink>
            <li className="list" onClick={handleLogout}>Log Out</li>
        </ul>
    );
};

export default UserMenu;
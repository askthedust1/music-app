import React from 'react';
import './nav.css';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../app/hook';
import { selectUser } from '../../features/users/usersSlice';
import UserMenu from './UserMenu';
import AnonymousMenu from './AnonymousMenu';

const Nav = () => {
  const user = useAppSelector(selectUser);

  return (
    <div className="header header-wrap-one">
      <div className="container1 cf">
        <h1 className="logo">
          <NavLink to="/">
            <img className="logo" src="https://i.ibb.co/MBNpPfK/1logo3.png" alt="1logo3" />
          </NavLink>
        </h1>
        <div className="navigation">{user ? <UserMenu user={user} /> : <AnonymousMenu />}</div>
      </div>
    </div>
  );
};

export default Nav;

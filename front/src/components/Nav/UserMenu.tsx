import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../app/hook';
import { logout } from '../../features/users/usersThunk';
import { apiUrl, userRoles } from '../../constants';
import { IUser } from '../../types';

interface IProps {
  user: IUser;
}

const UserMenu: React.FC<IProps> = ({ user }) => {
  const dispatch = useAppDispatch();
  const handleLogout = () => dispatch(logout());

  let userAva;

  if (user.googleID) {
    userAva = user.avatar;
  }

  if (!user.googleID) {
    userAva = apiUrl + '/' + user.avatar;
  }

  return (
    <ul>
      {user.avatar ? (
        <img className="user-ava" src={userAva} alt={user.username} />
      ) : (
        <img className="user-ava" src="https://i.redd.it/v6fk4w7a76j91.png" alt={user.username} />
      )}
      <b className="list" style={{ color: '#00E20B' }}>
        Hello, {user.username}!
      </b>
      <NavLink className="list" to="/">
        Home
      </NavLink>
      <NavLink className="list" to="/tracks_history">
        Track History
      </NavLink>
      <div className="dropdown">
        <button className="dropbtn">Add new</button>
        <div className="dropdown-content">
          <NavLink className="list" to="/add_artist">
            Add artist
          </NavLink>
          <NavLink className="list" to="/add_album">
            Add album
          </NavLink>
          <NavLink className="list" to="/add_track">
            Add track
          </NavLink>
        </div>
      </div>

      {user.role === userRoles.admin ? (
        <>
          <NavLink className="list" to="/admin">
            Admin
          </NavLink>
        </>
      ) : null}
      <li className="list" onClick={handleLogout}>
        Log Out
      </li>
    </ul>
  );
};

export default UserMenu;

import React from 'react';
import Artists from "./features/artists/Artists";
import "./App.css"
import {Route, Routes} from "react-router-dom";
import Albums from "./features/albums/Albums";
import Tracks from "./features/tracks/Tracks";
import Nav from "./components/Nav/Nav";
import Register from './features/users/Register';
import Login from './features/users/Login';
import TrackHistory from "./features/trackHistory/trackHistory";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import {useAppSelector} from "./app/hook";
import {selectUser} from "./features/users/usersSlice";
import {userRoles} from "./constants";
import ArtistForm from "./features/artists/ArtistForm/ArtistForm";
import AlbumsForm from "./features/albums/AlbumsForm/AlbumsForm";
import TracksForm from "./features/tracks/TracksForm/TracksForm";
const App = () => {
  const user = useAppSelector(selectUser);

  return (
    <div className="App">
        <Nav/>
        <div className="flexing">
            <Routes>
                <Route path="/" element={<Artists/>}/>
                <Route path="/albums/:id" element={<Albums/>}/>
                <Route path="/tracks/:id" element={<Tracks/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>} />
                <Route path="/tracks_history" element={<TrackHistory/>} />
                <Route path="/add_artist" element={(
                    <ProtectedRoute isAllowed={user && user.role === userRoles.user}>
                        <ArtistForm/>
                    </ProtectedRoute>
                )}/>

                <Route path="/add_album" element={(
                    <ProtectedRoute isAllowed={user && user.role === userRoles.user}>
                        <AlbumsForm/>
                    </ProtectedRoute>
                )}/>

                <Route path="/add_track" element={(
                    <ProtectedRoute isAllowed={user && user.role === userRoles.user}>
                        <TracksForm/>
                    </ProtectedRoute>
                )}/>
            </Routes>
        </div>
    </div>
  );
};

export default App;

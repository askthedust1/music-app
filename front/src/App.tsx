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
function App() {
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
            </Routes>
        </div>
    </div>
  );
}

export default App;

import React from 'react';
import Artists from "./features/artists/Artists";
import "./App.css"
import {Route, Routes} from "react-router-dom";
import Albums from "./features/albums/Albums";
import Tracks from "./features/tracks/Tracks";
import Nav from "./components/Nav/Nav";
function App() {
  return (
    <div className="App">
        <Nav/>
        <div className="flexing">
            <Routes>
                <Route path="/" element={<Artists/>}/>
                <Route path="/albums/:id" element={<Albums/>}/>
                <Route path="/tracks/:id" element={<Tracks/>}/>
            </Routes>
        </div>
    </div>
  );
}

export default App;

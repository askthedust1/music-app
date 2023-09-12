import React from 'react';
import Artists from "./features/artists/Artists";
import "./App.css"
import {Route, Routes} from "react-router-dom";
import Albums from "./features/albums/Albums";
import Tracks from "./features/tracks/Tracks";
function App() {
  return (
    <div className="App">
        <Routes>
            <Route path="/" element={<Artists/>}/>
            <Route path="/albums/:id" element={<Albums/>}/>
            <Route path="/tracks/:id" element={<Tracks/>}/>
        </Routes>
    </div>
  );
}

export default App;

import React from 'react';
import Artists from "./features/artists/Artists";
import "./App.css"
import {Route, Routes} from "react-router-dom";
import Albums from "./features/albums/Albums";
function App() {
  return (
    <div className="App">
        <Routes>
            <Route path="/" element={<Artists/>}/>
            <Route path="/albums/:id" element={<Albums/>}/>
        </Routes>
    </div>
  );
}

export default App;

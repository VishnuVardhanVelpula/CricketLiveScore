// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LiveScore from './components/LiveScore';
import Navbar from './components/Navbar';
import About from './components/About';
import Matches from './components/Matches';
import PlayerInfo from './components/PlayerInfo';
import CountriesList from './components/CountriesList';
import PlayersList from './components/PlayersList'; // Import the new PlayersList component

const App = () => {
    return (
        <Router>
            <div>
                <Navbar />
                <Routes>
                    <Route path="/" element={<LiveScore />} />
                    <Route path="/matches" element={<Matches />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/player-info" element={<PlayerInfo />} />
                    <Route path="/countries" element={<CountriesList />} />
                    <Route path="/players" element={<PlayersList />} /> {/* New Route */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;

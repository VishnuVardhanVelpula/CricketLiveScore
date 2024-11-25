// src/components/Navbar.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Ensure to import the CSS

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Live Score</Link></li>
                <li><Link to="/matches">Matches</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/player-info">Player Info</Link></li>
                <li><Link to="/countries">Countries</Link></li>
                <li><Link to="/players">Players List</Link></li> {/* New Link */}
            </ul>
        </nav>
    );
};

export default Navbar;

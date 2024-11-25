// src/components/About.js
import React from 'react';
import './About.css'; // Import the CSS file for styling

const About = () => {
    return (
        <div className="about-container">
            <h1>About Our Cricket Live Score App</h1>
            <p>
                Welcome to our Cricket Live Score App! This application provides real-time updates on ongoing cricket matches
                around the world. Stay updated with live scores, match schedules, and more.
            </p>
            <h2>Features:</h2>
            <ul>
                <li>Live scores of current matches</li>
                <li>Match details including teams and venue</li>
                <li>User-friendly interface</li>
                <li>Up-to-date cricket news and information</li>
                
            </ul>
            <h2>Developed By:</h2>
            <p>Vishnu Vardhan Velpua <br></br> Sameera</p>
        </div>
    );
};

export default About;
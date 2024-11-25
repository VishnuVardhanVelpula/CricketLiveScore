// src/components/PlayerInfo.js
import React, { useState } from 'react';
import './PlayerInfo.css';

const PlayerInfo = () => {
    const [playerData, setPlayerData] = useState(null);
    const [playerId, setPlayerId] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const fetchPlayerInfo = async () => {
        try {
            const response = await fetch(`https://api.cricapi.com/v1/players_info?apikey=2ed24b6f-7019-4231-8e6a-2bb5c2cbcdf5&id=${playerId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            if (data && data.status === 'success') {
                setPlayerData(data.data);
                setErrorMessage('');
            } else {
                setPlayerData(null);
                setErrorMessage('Player not found. Please check the ID.');
            }
        } catch (error) {
            setErrorMessage(`Failed to fetch player info: ${error.message}`);
        }
    };

    const handleSearch = () => {
        if (playerId) fetchPlayerInfo();
    };

    return (
        <div className="player-info-container">
            <h1>Player Information</h1>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Enter Player ID"
                    value={playerId}
                    onChange={(e) => setPlayerId(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {playerData && (
                <div className="player-card">
                    <img src={playerData.playerImg} alt={`${playerData.name}`} className="player-img" />
                    <h2>{playerData.name}</h2>
                    <p><strong>Date of Birth:</strong> {new Date(playerData.dateOfBirth).toLocaleDateString()}</p>
                    <p><strong>Role:</strong> {playerData.role}</p>
                    <p><strong>Batting Style:</strong> {playerData.battingStyle}</p>
                    <p><strong>Bowling Style:</strong> {playerData.bowlingStyle}</p>
                    <p><strong>Country:</strong> {playerData.country}</p>
                </div>
            )}
        </div>
    );
};

export default PlayerInfo;

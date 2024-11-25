// src/components/PlayerList.js
import React, { useState, useEffect } from 'react';
import './PlayersList.css'; // Import the CSS file for styling

const PlayerList = () => {
    const [players, setPlayers] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(true); // For loading state

    const fetchPlayers = async () => {
        try {
            const response = await fetch(`https://api.cricapi.com/v1/players?apikey=2ed24b6f-7019-4231-8e6a-2bb5c2cbcdf5`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            if (data && data.data && data.data.length > 0) {
                setPlayers(data.data);
            } else {
                setErrorMessage("No players found.");
            }
        } catch (error) {
            console.error('Error fetching players:', error);
            setErrorMessage(`Failed to load players: ${error.message}`);
        } finally {
            setLoading(false); // Set loading to false after fetching
        }
    };

    useEffect(() => {
        fetchPlayers();
    }, []);

    return (
        <div className="player-list-container">
            <h1>All Players List</h1>
            {loading && <p>Loading players...</p>}
            {errorMessage && <p>{errorMessage}</p>}
            {players.length > 0 && (
                <div className="players-grid">
                    {players.map((player) => (
                        <div className="player-card" key={player.id}>
                            <h2>{player.name}</h2>
                            <p><strong>Country:</strong> {player.country}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PlayerList;

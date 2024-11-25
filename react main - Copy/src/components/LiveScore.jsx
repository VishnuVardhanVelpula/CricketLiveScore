// src/components/LiveScore.js
import React, { useState, useEffect } from 'react';
import './LiveScore.css'; // Import the CSS file for styling

const LiveScore = () => {
    const [liveMatches, setLiveMatches] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedMatch, setSelectedMatch] = useState(null); // For selected match
    const [isModalOpen, setIsModalOpen] = useState(false); // For modal visibility

    const fetchLiveMatches = async () => {
        try {
            const response = await fetch(`https://api.cricapi.com/v1/currentMatches?apikey=2ed24b6f-7019-4231-8e6a-2bb5c2cbcdf5`);  
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            if (data && data.data && data.data.length > 0) {
                setLiveMatches(data.data);
            } else {
                setLiveMatches([]);
                setErrorMessage("No live matches available at the moment.");
            }
        } catch (error) {
            console.error('Error fetching the live matches:', error);
            setLiveMatches([]);
            setErrorMessage(`Failed to load live matches: ${error.message}`);
        }
    };

    useEffect(() => {
        fetchLiveMatches();
    }, []);

    const openModal = (match) => {
        setSelectedMatch(match); // Set the selected match
        setIsModalOpen(true); // Open the modal
    };

    const closeModal = () => {
        setIsModalOpen(false); // Close the modal
        setSelectedMatch(null); // Clear the selected match
    };

    return (
        <div className="live-scores-container">
            <h1>Current Live Matches</h1>
            {errorMessage && <p>{errorMessage}</p>}
            {liveMatches.length > 0 ? (
                <div className="cards-container">
                    {liveMatches.map((liveMatch) => (
                        <div className="match-card" key={liveMatch.id} onClick={() => openModal(liveMatch)}>
                            <h2>{liveMatch.name}</h2>
                            <p><strong>Status:</strong> {liveMatch.status}</p>
                            <p><strong>Venue:</strong> {liveMatch.venue}</p>
                            <p><strong>Date:</strong> {liveMatch.date}</p>
                            <p>
                                <strong>Teams:</strong> {Array.isArray(liveMatch.teams) ? liveMatch.teams.join(' vs ') : 'Teams information not available.'}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No live matches available at the moment.</p>
            )}

            {isModalOpen && selectedMatch && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>{selectedMatch.name}</h2>
                        <p><strong>Status:</strong> {selectedMatch.status}</p>
                        <p><strong>Venue:</strong> {selectedMatch.venue}</p>
                        <p><strong>Date:</strong> {selectedMatch.date}</p>
                        <p>
                            <strong>Teams:</strong> {Array.isArray(selectedMatch.teams) ? selectedMatch.teams.join(' vs ') : 'Teams information not available.'}
                        </p>
                        {selectedMatch.score && selectedMatch.score.length > 0 ? (
                            <div>
                                <h3>Score:</h3>
                                <ul>
                                    {selectedMatch.score.map((inning, index) => (
                                        <li key={index}>
                                            {inning.inning}: {inning.r} runs, {inning.w} wickets, {inning.o} overs
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <p>No score information available.</p>
                        )}
                        <button onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LiveScore;

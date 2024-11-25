// src/components/Matches.js
import React, { useEffect, useState } from 'react';
import './Matches.css';
import MatchModal from './MatchModal'; // Import the modal component

const Matches = () => {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedMatch, setSelectedMatch] = useState(null); // State to hold the selected match
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const response = await fetch(`https://api.cricapi.com/v1/series?apikey=2ed24b6f-7019-4231-8e6a-2bb5c2cbcdf5&offset=0`);
                if (!response.ok) {
                    throw new Error('Failed to fetch matches');
                }
                const data = await response.json();

                if (data.status === "success" && Array.isArray(data.data)) {
                    setMatches(data.data);
                } else {
                    setMatches([]);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMatches();
    }, []);

    const handleMatchClick = (match) => {
        setSelectedMatch(match); // Set the selected match
        setIsModalOpen(true); // Open the modal
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); // Close the modal
        setSelectedMatch(null); // Reset the selected match
    };

    if (loading) {
        return <div className="loading-message">Loading matches...</div>;
    }

    if (error) {
        return <div className="error-message">Error: {error}</div>;
    }

    return (
        <div className="matches-container">
            <h2>Current Matches (Series)</h2>
            {matches.length === 0 ? (
                <p className="no-matches-message">No matches available.</p>
            ) : (
                <div className="cards-container">
                    {matches.map((match) => (
                        <div 
                            className="match-card" 
                            key={match.id} 
                            onClick={() => handleMatchClick(match)} // Handle click to open modal
                        >
                            <h3>{match.name || 'Series Name Unavailable'}</h3>
                            <div className="match-info">
                                <p><strong>Start Date:</strong> {match.startDate || 'N/A'}</p>
                                <p><strong>End Date:</strong> {match.endDate || 'N/A'}</p>
                                <p><strong>ODI Matches:</strong> {match.odi || 'N/A'}</p>
                                <p><strong>T20 Matches:</strong> {match.t20 || 'N/A'}</p>
                                <p><strong>Test Matches:</strong> {match.test || 'N/A'}</p>
                                <p><strong>Total Matches:</strong> {match.matches || 'N/A'}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Render the modal if it's open */}
            {isModalOpen && <MatchModal match={selectedMatch} onClose={handleCloseModal} />}
        </div>
    );
};

export default Matches;

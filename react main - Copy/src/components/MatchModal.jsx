// src/components/MatchModal.js
import React from 'react';
import './MatchModal.css'; // CSS file for styling the modal

const MatchModal = ({ match, onClose }) => {
    if (!match) return null; // If there's no match, return null

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{match.name || 'Series Name Unavailable'}</h2>
                <p><strong>Status:</strong> {match.status || 'Status Unavailable'}</p>
                <p><strong>Venue:</strong> {match.venue || 'Venue Unavailable'}</p>
                <p><strong>Date:</strong> {match.startDate || 'Date Unavailable'}</p>
                <p>
                    <strong>Teams:</strong> {Array.isArray(match.teams) ? match.teams.join(' vs ') : 'Teams information not available.'}
                </p>
                {match.score && match.score.length > 0 ? (
                    <div>
                        <h3>Score:</h3>
                        <ul>
                            {match.score.map((inning, index) => (
                                <li key={index}>
                                    {inning.inning}: {inning.r} runs, {inning.w} wickets, {inning.o} overs
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p>No score information available.</p>
                )}
                <button onClick={onClose} className="close-button">Close</button>
            </div>
        </div>
    );
};

export default MatchModal;

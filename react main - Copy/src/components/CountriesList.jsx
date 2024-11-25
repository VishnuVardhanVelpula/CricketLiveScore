import React, { useEffect, useState } from 'react';
import './CountriesList.css'; // Ensure to import the CSS

const CountriesList = () => {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchCountries = async () => {
        try {
            const response = await fetch('https://api.cricapi.com/v1/countries?apikey=2ed24b6f-7019-4231-8e6a-2bb5c2cbcdf5&offset=0');
            const data = await response.json();
            if (data.status === 'success') {
                setCountries(data.data);
            } else {
                throw new Error('Failed to fetch countries');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCountries();
    }, []);

    if (loading) return <p>Loading countries...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="countries-container">
            <h2>Countries and Flags</h2>
            <ul className="countries-list">
                {countries.map(country => (
                    <li key={country.id} className="country-card">
                        <img src={country.genericFlag} alt={`${country.name} flag`} className="country-flag" />
                        <div className="country-name">{country.name}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CountriesList;

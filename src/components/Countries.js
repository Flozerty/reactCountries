import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';

const Countries = () => {

    const [data, setData] = useState([]);
    const [rangeValue, setRangeValue] = useState(36);
    const radios = ["Africa", "America", "Asia", "Europe", "Oceania"];
    const [selectedRadio, setSelectedRadio] = useState("");

    useEffect(() => {
        axios
            .get("https://restcountries.com/v3.1/all")
            .then((res) => setData(res.data))
            .catch((error) => console.error("Erreur lors de la requête :", error)); // !! super utile !!
    }, []);

    return (
        <div className='countries'>

            <ul className='radio-container'>
                <input type='range' min="1" max="250" defaultValue={rangeValue}
                    onChange={(e) => setRangeValue(e.target.value)} />

                {radios.map((continent) => (
                    <li>
                        {/* Name très important pour que le radio soit le meme sur tous les continents (on ne peut en cocher qu'un) */}
                        <input type='radio'
                            id={continent}
                            name='continentRadio'
                            onChange={(e) => setSelectedRadio(e.target.id)}
                            checked={continent === selectedRadio} />

                        <label htmlFor={continent}>{continent}</label>
                    </li>
                ))}
            </ul>
            {/* condition                    action         */}
            {selectedRadio && <button onClick={() => setSelectedRadio('')}>Annuler la recherche</button>}

            <ul>
                {
                    data
                        .filter((country) => country.continents[0].includes(selectedRadio))
                        .sort((a, b) => b.population - a.population)
                        .slice(0, rangeValue)
                        .map((country, index) => (
                            <Card key={index} country={country} />
                        ))}
            </ul>
        </div >
    );
};

export default Countries;
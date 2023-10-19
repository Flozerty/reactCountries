import React from 'react';

// { country } équivaut a appeler le composant parent : "countries" ou props.country
const Card = ({ country }) => {


    return (
        <li className='card'>
            <img src={country.flags.svg} alt={"drapeau " + country.translations.fra.common} />

            <div className='infos'>
                <h2>{country.translations.fra.common}</h2>
                <h2>{country.capital}</h2>
                <h2>Pop. {country.population.toLocaleString()}</h2>
            </div>
        </li>
    );
};

export default Card;
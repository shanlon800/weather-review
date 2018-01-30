import React from 'react';
import { Link } from 'react-router';

const CityTile = props => {
  return(
    <div className='cityContainer'>
      <Link to={`/cities/${props.id}`}>
        <h2>{props.city_name}, {props.state}</h2>
        <li>{props.description}</li>
      </Link>
    </div>
  )
}

export default CityTile;

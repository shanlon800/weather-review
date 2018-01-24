import React from 'react';
import { Link } from 'react-router';

const CityTile = props => {
  return(
    <div>
      <Link to={`/cities/${props.id}`}>
        <h3>{props.city_name} {props.state}</h3>
      </Link>
      <li>{props.description}</li>
    </div>
  )
}

export default CityTile;

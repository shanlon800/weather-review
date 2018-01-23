import React from 'react';

const CityTile = props => {
  return(
    <div>
      <h3>{props.city_name} {props.state}</h3>
      <li>{props.description}</li>
    </div>
  )
}

export default CityTile;

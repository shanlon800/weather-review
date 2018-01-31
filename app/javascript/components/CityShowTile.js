import React from 'react';

const CityShowTile = props => {
  return(
    <div className='city-head'>
      <h1>{props.city_name} {props.state}</h1>
      <p id="show-description">{props.description}</p>

      <div id="comfort-average">
        <h7>Placeholder: Comfort Average</h7>
      </div>
      <div id="variance-average">
        <p>Placeholder: Variance Average</p>
      </div>

    </div>
  )
}

export default CityShowTile;

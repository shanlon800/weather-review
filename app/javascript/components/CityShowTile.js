import React from 'react';
import { Link } from 'react-router';
import BackButton from './BackButton';

const CityShowTile = props => {
  let editButton;
  if (props.currentUserId === props.cityCreator) {
    editButton =  <a href={`/cities/${props.cityId}/edit`} className='button'>Edit</a>
  };

  return(
    <div className='city-head'>
    <BackButton/>
      <h1>{props.city_name} {props.state}</h1>
      <p id="show-description">{props.description}</p>

      <div id="comfort-average">
        <h7>Average Comfort Index: {props.averageComfort}</h7>
      </div>
      <div id="variance-average">
        <p>Average Weather Variance: {props.averageVariance}</p>
      </div>
      {editButton}
    </div>
  )
}

export default CityShowTile;

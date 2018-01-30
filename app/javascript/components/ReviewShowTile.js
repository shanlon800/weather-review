import React from 'react';

const ReviewShowTile = props => {
  return(
    <div className='reviewContainer'>
      <span className='reviewDetails'>
        <h5>{props.body}</h5>
        <div className='rating'>
          <p>Comfort Index: {props.comfort_index}</p>
          <p>Weather Variance: {props.weather_variance}</p>
        </div>
      </span>
      <span className='votes'>
        <div><i className='fa fa-chevron-up'></i></div>
        <div>•</div>
        <div><i className='fa fa-chevron-down'></i></div>
      </span>
    </div>
  )
}

export default ReviewShowTile;

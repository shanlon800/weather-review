import React from 'react';

const ReviewShowTile = props => {
  return(
    <div>
      <h3>Reviews:</h3>
      <h5>{props.body}</h5>
      <div>
        <h7>Comfort Index: {props.comfort_index}</h7>
      </div>
      <p>Weather Variance: {props.weather_variance}</p>

    </div>
  )
}

export default ReviewShowTile;

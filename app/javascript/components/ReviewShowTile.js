import React from 'react';

const ReviewShowTile = props => {

  if (props.creator === props.currentUser) {
    return(
      <div>
        <h5>{props.body}</h5>
        <div>
          <h7>Comfort Index: {props.comfort_index}</h7>
        </div>
        <p>Weather Variance: {props.weather_variance}</p>
        <button onClick={props.handleDelete}>Delete</button>
      </div>
    )

  }
  return(
    <div>
      <h5>{props.body}</h5>
      <div>
        <h7>Comfort Index: {props.comfort_index}</h7>
      </div>
      <p>Weather Variance: {props.weather_variance}</p>

    </div>
  )
}

export default ReviewShowTile;

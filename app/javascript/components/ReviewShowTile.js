import React from 'react';
import ShowRating from './ShowRating';

const ReviewShowTile = props => {
  let comfortTagId = `comfort-index-${props.id}`;
  let varianceTagId = `variance-index-${props.id}`;
  let comfortKey = `${props.id}${props.comfort_index}`;
  let varianceKey = `${props.id}${props.weather_variance}`;

  return(
    <div className='review-container'>
      <span className='review-details' id={props.id}>
        <h5>{props.body}</h5>
        <div className='rating'>
          <p id={comfortTagId}>
            Comfort Index: <ShowRating
              key={comfortKey}
              type="comfort"
              value={props.comfort_index}
            />
          </p>
          <p id={varianceTagId}>
            Weather Variance:  <ShowRating
              key={varianceKey}
              type="variance"
              value={props.weather_variance}
            />
          </p>
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

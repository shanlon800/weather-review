import React from 'react';
import ShowRating from './ShowRating';
import VoteTile from './VoteTile';

const ReviewShowTile = props => {
  let comfortTagId = `comfort-index-${props.id}`;
  let varianceTagId = `variance-index-${props.id}`;
  let comfortKey = `${props.id}${props.comfort_index}`;
  let varianceKey = `${props.id}${props.weather_variance}`;
  let deleteButton = '';
  if (props.creator === props.currentUser || props.admin === true) {
    deleteButton = <button onClick={props.handleDelete} className='alert'>Delete</button>
  }
  return(
    <div className='review-container'>
      <span className='review-details' id={props.id}>
        <div className='rating'>
          <span id={comfortTagId}>
            Comfort Index: <ShowRating
              key={comfortKey}
              type="comfort"
              value={props.comfort_index}
            />
          </span>
          <span id={varianceTagId}>
            Weather Variance:  <ShowRating
              key={varianceKey}
              type="variance"
              value={props.weather_variance}
            />
          </span>
        </div>
        <h5>{props.body}</h5>
      </span>
      <VoteTile
        key={props.id}
        currentUser={props.currentUser}
        cityId={props.city_id}
        reviewId={props.id}
      />
      {deleteButton}
    </div>
  )
}

export default ReviewShowTile;

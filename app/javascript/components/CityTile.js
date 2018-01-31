import React from 'react';
import { Link } from 'react-router';

const CityTile = props => {
  if (props.banner.url != null ){

    return(
      <div class="cityContainer">
        <Link to={`/cities/${props.id}`}>
          <h2 class="namestate">{props.city_name}, {props.state}</h2>
          <li class="description">{props.description}</li>
          <img class="banner" src={props.banner.url} />
        </Link>
      </div>
    )
  } else {
    return(
      <div class="cityContainer">
        <Link to={`/cities/${props.id}`}>
          <h2 class="namestate">{props.city_name}, {props.state}</h2>
          <li class="description">{props.description}</li>
        </Link>
      </div>
    )
  }
}

export default CityTile;

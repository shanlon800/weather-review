import React from 'react';
import { Link } from 'react-router';

const CityTile = props => {
  if (props.banner.url != null ){

    return(
      <div class="container">
        <Link to={`/cities/${props.id}`}>
          <h3 class="namestate">{props.city_name} {props.state}</h3>
        </Link>
        <li class="description">{props.description}</li>

        <img class="banner" src={props.banner.url} />
      </div>
    )
  } else {
    return(
      <div class="container">
        <Link to={`/cities/${props.id}`}>
          <h3 class="namestate">{props.city_name} {props.state}</h3>
        </Link>
        <li class="description">{props.description}</li>
      </div>
    )
  }
}

export default CityTile;

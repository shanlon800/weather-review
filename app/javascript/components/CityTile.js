import React from 'react';
import { Link } from 'react-router';

const CityTile = props => {
  if (props.banner.url != null ){

    return(
      <div className="cityContainer">
        <Link to={`/cities/${props.id}`}>
          <h2 className="namestate">{props.city_name}, {props.state}</h2>
          <li className="description">{props.description}</li>
          <img className="banner" src={props.banner.url} />
        </Link>
      </div>
    )
  } else {
    return(
      <div className="cityContainer">
        <Link to={`/cities/${props.id}`}>
          <h2 className="namestate">{props.city_name}, {props.state}</h2>
          <li className="description">{props.description}</li>
        </Link>
      </div>
    )
  }
}

export default CityTile;

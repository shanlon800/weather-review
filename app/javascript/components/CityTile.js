import React from 'react';
import { Link } from 'react-router';

const CityTile = props => {
  if (props.banner.url != null ){

    return(
      <div className="container">
        <Link to={`/cities/${props.id}`}>
          <h3 className="namestate">{props.city_name} {props.state}</h3>
        </Link>
        <li className="description">{props.description}</li>

        <img className="banner" src={props.banner.url} />
      </div>
    )
  } else {
    return(
      <div className="container">
        <Link to={`/cities/${props.id}`}>
          <h3 className="namestate">{props.city_name} {props.state}</h3>
        </Link>
        <li className="description">{props.description}</li>
      </div>
    )
  }
}

export default CityTile;

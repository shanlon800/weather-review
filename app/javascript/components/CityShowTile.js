import React from 'react';
import { Link } from 'react-router';
import BackButton from './BackButton';

const CityShowTile = props => {
  let editButton;
  let deleteButton;
  if (props.currentUserId === props.cityCreator) {
    editButton =  <a href={`/cities/${props.cityId}/edit`} className='button'>Edit</a>
  };
  if (props.admin) {
    deleteButton = <button className='alert button' onClick={props.cityDelete}>Delete</button>
    editButton =  <a href={`/cities/${props.cityId}/edit`} className='button'>Edit</a>
  };

  if (props.banner != null) {

    var divStyle = {
      color: "black",
      backgroundImage: 'url(' + props.banner.url + ')'

    };
    return(

      <div className='city-head' style={divStyle}>
        <BackButton/>
        <div style={divStyle}> </div>
        <h1 className="white-text">{props.city_name} {props.state}</h1>
        <p className="white-text">{props.description}</p>

        <div id="comfort-average">
          <h7 className="white-text">Average Comfort Index: {props.averageComfort}</h7>
        </div>
        <div id="variance-average">
          <p className="white-text">Average Weather Variance: {props.averageVariance}</p>
        </div>
        {editButton} {deleteButton}
        <div className="white-box">
        </div>
      </div>
    )


  } else {
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
      {editButton} {deleteButton}
      </div>
    )

  }
}

// <img className="show-banner" src={props.banner.url} />
export default CityShowTile;

import React, { Component } from 'react';


class ReviewShowTile extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    let ratingRender = function(value, type) {
      let faIconType;
      if (type == 'comfort') {
        faIconType = 'star';
      } else if (type == 'variance') {
        faIconType = 'square';
      }
      let iconEmpty = `fa fa-${faIconType}-o`;
      let iconFull = `fa fa-${faIconType}`;

      let ratingContainer = document.createElement('span');

      for (var i = 0; i < value; i++) {
        let rateIconContainer = document.createElement('i');
        rateIconContainer.className = iconFull + ` ${i+1}`;
        ratingContainer.appendChild(rateIconContainer);
      }
      for (var i = 0; i < 5-value; i++) {
        let rateIconContainer = document.createElement('i');
        rateIconContainer.className = iconEmpty;
        ratingContainer.appendChild(rateIconContainer);
      }
      return ratingContainer
    }

    let comfortIndex = document.getElementById(`comfort-index-${this.props.id}`)
    let comfortRating = ratingRender(this.props.comfort_index, 'comfort');

    let varianceIndex = document.getElementById(`variance-index-${this.props.id}`)
    let varianceRating = ratingRender(this.props.weather_variance, 'variance');

    comfortIndex.appendChild(comfortRating);
    varianceIndex.appendChild(varianceRating);
  }

  // debugger;
  render(){
    let comfortTagId = `comfort-index-${this.props.id}`;
    let varianceTagId = `variance-index-${this.props.id}`;

    return(
      <div className='reviewContainer'>
        <span className='reviewDetails' id={this.props.id}>
          <h5>{this.props.body}</h5>
          <div className='rating'>
            <p id={comfortTagId}>Comfort Index: </p>
            <p id={varianceTagId}>Weather Variance: </p>
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

}

export default ReviewShowTile;

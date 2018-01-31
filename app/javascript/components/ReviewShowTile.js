import React, { Component } from 'react';


class ReviewShowTile extends Component {
  constructor(props) {
    super(props);
    this.rateConstructor = this.rateConstructor.bind(this);
  }

  rateConstructor(value, type){
    let faIconType;
    if (type == 'comfort') {
      faIconType = 'star';
    } else if (type == 'variance') {
      faIconType = 'square';
    }
    let iconEmpty = `fa fa-${faIconType}-o`;
    let iconFull = `fa fa-${faIconType}`;
    let iconArray = [];

    for (var i = 0; i < value; i++) {
      iconArray[i] = iconFull + ` ${type}-${i+1}`;
    }
    for (var i = 0; i < 5-value; i++) {
      iconArray.push(iconEmpty);
    }
    return iconArray;
  }

  // componentDidMount(){
  //   let ratingRender = function(value, type) {
  //     let faIconType;
  //     if (type == 'comfort') {
  //       faIconType = 'star';
  //     } else if (type == 'variance') {
  //       faIconType = 'square';
  //     }
  //     let iconEmpty = `fa fa-${faIconType}-o`;
  //     let iconFull = `fa fa-${faIconType}`;
  //
  //     let ratingContainer = document.createElement('span');
  //
  //     for (var i = 0; i < value; i++) {
  //       let rateIconContainer = document.createElement('i');
  //       rateIconContainer.className = iconFull + ` ${i+1}`;
  //       ratingContainer.appendChild(rateIconContainer);
  //     }
  //     for (var i = 0; i < 5-value; i++) {
  //       let rateIconContainer = document.createElement('i');
  //       rateIconContainer.className = iconEmpty;
  //       ratingContainer.appendChild(rateIconContainer);
  //     }
  //     return ratingContainer
  //   }
  //
  //   let comfortIndex = document.getElementById(`comfort-index-${this.props.id}`)
  //   let comfortRating = this.ratingRender(this.props.comfort_index, 'comfort');
  //
  //   let varianceIndex = document.getElementById(`variance-index-${this.props.id}`)
  //   let varianceRating = this.ratingRender(this.props.weather_variance, 'variance');
  //
  //   comfortIndex.appendChild(comfortRating);
  //   varianceIndex.appendChild(varianceRating);
  // }

  // debugger;
  render(){
    let comfortTagId = `comfort-index-${this.props.id}`;
    let varianceTagId = `variance-index-${this.props.id}`;

    let cRating = this.rateConstructor(this.props.comfort_index, 'comfort');
    let vRating = this.rateConstructor(this.props.weather_variance, 'variance');

    return(
      <div className='reviewContainer'>
        <span className='reviewDetails' id={this.props.id}>
          <h5>{this.props.body}</h5>
          <div className='rating'>
            <p id={comfortTagId}>Comfort Index: <i className={cRating[0]}></i><i className={cRating[1]}></i><i className={cRating[2]}></i><i className={cRating[3]}></i><i className={cRating[4]}></i></p>
            <p id={varianceTagId}>Weather Variance: <i className={vRating[0]}></i><i className={vRating[1]}></i><i className={vRating[2]}></i><i className={vRating[3]}></i><i className={vRating[4]}></i></p>
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

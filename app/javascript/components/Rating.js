import React, { Component } from 'react';

class Rating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cacheRating: 0,
      selectRating: this.props.value
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selectRating != nextProps.value) {
      this.setState({
        selectRating: nextProps.value,
      })
    }
  }

 
  handleClick(e) {
    e.preventDefault();

    let rateValue = this.state.cacheRating;

    this.setState({ selectRating: rateValue });

    let payLoad = [this.props.name, rateValue]
    this.props.handlerFunction(payLoad)
  }

  handleHover(e) {
    this.setState({ cacheRating: e.target.id })
  }

  handleMouseOut(e) {
    this.setState({ cacheRating: 0 })
  }

  render() {
    let faIconType;
    if (this.props.rateType == 'comfort') {
      faIconType = 'star';
    } else if (this.props.rateType == 'variance') {
      faIconType = 'square';
    }
    let iconEmpty = `fa fa-${faIconType}-o`;
    let iconFull = `fa fa-${faIconType}`;
    let iconArray = [];
    let source;

    if (this.state.selectRating === 0) {
      source = this.state.cacheRating;
    } else {
      source = this.state.selectRating;
    }

    let rating = source;

    for (var i = 0; i < rating; i++) {
      iconArray[i] = iconFull;
    }
    for (var i = 0; i < 5-rating; i++) {
      iconArray.push(iconEmpty);
    }
    return (
      <div onMouseOut={this.handleMouseOut} className='rate-this'>
        <label>{this.props.label}</label>
        <i id='1' onClick={this.handleClick} onMouseOver={this.handleHover} className={iconArray[0]} />
        <i id='2' onClick={this.handleClick} onMouseOver={this.handleHover} className={iconArray[1]} />
        <i id='3' onClick={this.handleClick} onMouseOver={this.handleHover} className={iconArray[2]} />
        <i id='4' onClick={this.handleClick} onMouseOver={this.handleHover} className={iconArray[3]} />
        <i id='5' onClick={this.handleClick} onMouseOver={this.handleHover} className={iconArray[4]} />
      </div>
    )
  };
}

export default Rating

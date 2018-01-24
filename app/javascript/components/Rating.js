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
    this.setState({ selectRating: this.state.cacheRating })
    this.props.handlerFunction(this.state.cacheRating)
  }

  handleHover(e) {
    this.setState({ cacheRating: e.target.id })
  }

  handleMouseOut(e) {
    this.setState({ cacheRating: 0 })
  }

  render() {
    if (this.props.) {

    }
    let starIconEmpty = 'fa fa-star-o';
    let starIconFull = 'fa fa-star';
    let starArray = [];
    let source;

    if (this.state.selectRating === 0) {
      source = this.state.cacheRating;
    } else {
      source = this.state.selectRating;
    }

    let rating = source / 100 * 5;

    for (var i = 0; i < rating; i++) {
      starArray[i] = starIconFull;
    }
    for (var i = 0; i < 5-rating; i++) {
      starArray.push(starIconEmpty);
    }

    return (
      <div onMouseOut={this.handleMouseOut} className='rate-this'>
        <label>{this.props.label}</label>

        <i id='20' onClick={this.handleClick} onMouseOver={this.handleHover} className={starArray[0]} />
        <i id='40' onClick={this.handleClick} onMouseOver={this.handleHover} className={starArray[1]} />
        <i id='60' onClick={this.handleClick} onMouseOver={this.handleHover} className={starArray[2]} />
        <i id='80' onClick={this.handleClick} onMouseOver={this.handleHover} className={starArray[3]} />
        <i id='100' onClick={this.handleClick} onMouseOver={this.handleHover} className={starArray[4]} />
      </div>
    )
  };
}

export default Rating

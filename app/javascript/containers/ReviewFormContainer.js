import React, { Component } from 'react';
import BodyField from '../components/BodyField'
import ComfortField from '../components/ComfortField'
import VarianceField from '../components/VarianceField'
import Rating from '../components/Rating'

class ReviewFormContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      reviewBody: "",
      reviewComfort: 0,
      reviewVariance: 0,
      errors: []
    }
    this.handleBodyChange = this.handleBodyChange.bind(this);
    // this.handleComfortChange = this.handleComfortChange.bind(this)
    // this.handleVarianceChange = this.handleVarianceChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRateChange = this.handleRateChange.bind(this);
    this.handleClearButton = this.handleClearButton.bind(this);
  }

  clearErrors() {
    this.setState({errors: []})
  }

  handleRateChange(e) {
    this.setState({ [e[0]]: e[1] })
    console.log(`Value of ${e[0]} is ${e[1]}.`);
  }

  handleBodyChange(event) {
    let newBody = event.target.value
    this.setState({reviewBody: newBody})
  }
  //
  // handleComfortChange(event) {
  //   let newComfort = event.target.value
  //   this.setState({reviewComfortIndex: newComfort})
  // }
  //
  // handleVarianceChange(event) {
  //   let newVariance = event.target.value
  //   this.setState({reviewVariance: newVariance})
  // }

  

  handleSubmit(event) {
    event.preventDefault()
    this.clearErrors()
    let errors = this.validateComfort()
    errors = errors.concat(this.validateVariance())
    if (errors.length == 0) {
      let formPayload = {
        reviewBody: this.state.reviewBody,
        reviewComfort: this.state.reviewComfort,
        reviewVariance: this.state.reviewVariance
      }
    } else {
      this.setState({errors: errors})
    }
    console.log(this.state)
  }

  validateComfort(){
    if(this.state.reviewComfort === 0) {
      return['Please select a Comfort Index Rating']
    }
    else {
      return[]
    }
  }

  validateVariance(){
    if(this.state.reviewVariance === 0) {
      return['Please select a Variance Rating']
    }
    else {
      return[]
    }
  }

  handleClearButton(event) {
    event.preventDefault()
    this.setState({
      reviewBody: '',
      reviewComfort: 0,
      reviewVariance: 0
    })
  }





  render() {
    return(
      <div>
        <p>{this.state.errors[0]}</p>
        <p>{this.state.errors[1]}</p>
          <form className="new-article-form callout">
            <Rating
              content={this.state.reviewComfort}
              label="Comfort Index"
              name="reviewComfort"
              rateType="comfort"
              value={this.state.reviewComfort}
              handlerFunction={this.handleRateChange}
            />
            <Rating
              content={this.state.reviewVariance}
              label="Variance Index"
              name="reviewVariance"
              rateType="variance"
              value={this.state.reviewVariance}
              handlerFunction={this.handleRateChange}
            />
            <BodyField
              content={this.state.reviewBody}
              label="Review"
              name="reviewBody"
              handleBodyChange={this.handleBodyChange}
            />

            <div className="button-group">
              <button className="button" onClick={this.handleClearButton}>Clear</button>
              <input className="button" type="submit" value="Submit" onClick={this.handleSubmit}/>
            </div>
          </form>
        </div>
    )
  }
}

export default ReviewFormContainer;

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
      reviewComfortIndex: "",
      reviewVariance: "",
      errors: []
    }
    this.handleBodyChange = this.handleBodyChange.bind(this)
    this.handleComfortChange = this.handleComfortChange.bind(this)
    this.handleVarianceChange = this.handleVarianceChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleBodyChange(event) {
    let newBody = event.target.value
    this.setState({reviewBody: newBody})
  }

  handleComfortChange(event) {
    let newComfort = event.target.value
    this.setState({reviewComfortIndex: newComfort})
  }

  handleVarianceChange(event) {
    let newVariance = event.target.value
    this.setState({reviewVariance: newVariance})
  }

  handleSubmit(event) {
    event.preventDefault()
  }

  render() {
    return(
      <div>
        <p>{this.state.errors[0]}</p>
        <p>{this.state.errors[1]}</p>
          <form className="new-article-form callout">
            <Rating
              content={this.state.reviewComfortIndex}
              label="Comfort Index"
              name="reviewComfortIndex"
              rateType="comfort"
              handleComfortChange={this.handleComfortChange}
            />
            <Rating
              content={this.state.reviewVariance}
              label="Variance Index"
              name="reviewVariance"
              rateType="variance"
              handleVarianceChange={this.handleVarianceChange}
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

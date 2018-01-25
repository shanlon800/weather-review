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
      errors: [],
      currentUser: null,
      currentCity: parseInt(this.props.id, 10)
    }
    this.handleBodyChange = this.handleBodyChange.bind(this);
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

//   componentDidMount() {
//   fetch('/api/v1/users')
//     .then(response => {
//       if (response.ok) {
//         return response;
//       } else {
//         let errorMessage = `${response.status} (${response.statusText})`,
//             error = new Error(errorMessage);
//         throw(error);
//       }
//     })
//     .then(response => response.json())
//     .then(body => {
//       let currentUser = body.current_user;
//       this.setState({ currentUser: currentUser });
//     })
//     .catch(error => console.error(`Error in fetch: ${error.message}`));
// }


  handleSubmit(event) {
    event.preventDefault()
    this.clearErrors()
    let errors = this.validateComfort()
    errors = errors.concat(this.validateVariance())
    if (errors.length == 0) {
      let formPayload = {
        body: this.state.reviewBody,
        comfort_index: this.state.reviewComfort,
        weather_variance: this.state.reviewVariance,
        city_id: this.state.currentCity,
        user_id: 0
      }
      this.props.addNewReview(formPayload);
    } else {
      this.setState({errors: errors})
    }
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

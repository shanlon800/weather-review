import React, { Component } from 'react';
import CityShowTile from '../components/CityShowTile'
import ReviewShowTile from '../components/ReviewShowTile'
import ReviewFormContainer from './ReviewFormContainer'

class CityShowContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      city: [],
      reviews: [],
      currentUser: ''
    }
    this.addNewReview = this.addNewReview.bind(this)
    this.deleteReview= this.deleteReview.bind(this)
  }

  addNewReview(formPayload) {
    fetch('/api/v1/reviews', {
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify(formPayload),
      headers: { 'Content-Type': 'application/json' }
    }).then(response => response.json())
    .then(body => {
      let newReview = this.state.reviews.concat(body)
      this.setState({reviews: newReview})
    })
  }

  componentDidMount() {
    fetch(`/api/v1/cities/${this.props.params.id}`)
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      let newCity = body;
      this.setState({
        city: newCity.city,
        reviews: newCity.reviews
      });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  componentWillMount() {
    fetch(`/api/v1/users`, { credentials: 'same-origin' })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(body => {
        let currentUser = body.current_user;
        if (currentUser != null) {
          this.setState({ currentUser: currentUser.id });
        } else {
          this.setState({ currentUser: null });
        }

      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  deleteReview(id) {
    fetch(`/api/v1/cities/${this.props.params.id}/reviews/${id}`, {
      credentials: 'same-origin',
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(body => {
      this.setState({
        reviews: body
      })
    })
  }


  render() {
    let addNewReview = (formPayload) => this.addNewReview(formPayload)
    let reviews = this.state.reviews.map(review => {
      let handleDelete = () => {this.deleteReview(review.id)}
      return(
        <ReviewShowTile
          key={review.id}
          body={review.body}
          comfort_index={review.comfort_index}
          weather_variance={review.weather_variance}
          currentUser={this.state.currentUser}
          creator={review.user_id}
          handleDelete={handleDelete}
        />
      )
    })

    if (this.state.currentUser != null) {
      return(
        <div>
          <CityShowTile
            city_name={this.state.city.city_name}
            state={this.state.city.state}
            description={this.state.city.description}
          />
          <ReviewFormContainer
            id={this.props.params.id}
            addNewReview={this.addNewReview}
            currentUser={this.state.currentUser}
          />
          {reviews}
        </div>
      )
    } else {
      return(
        <div>
          <CityShowTile
            city_name={this.state.city.city_name}
            state={this.state.city.state}
            description={this.state.city.description}
          />
          {reviews}
        </div>
      )
    }
  }
}

export default CityShowContainer;

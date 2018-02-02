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
      currentUser: '',
      admin: false,
      averageComfort: 0,
      averageVariance: 0
    }
    this.addNewReview = this.addNewReview.bind(this)
    this.deleteReview = this.deleteReview.bind(this)
    this.deleteCity = this.deleteCity.bind(this)
  }

  addNewReview(formPayload) {
    fetch('/api/v1/reviews', {
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify(formPayload),
      headers: { 'Content-Type': 'application/json' }
    })
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
      let newReview = this.state.reviews.concat(body.review)
      let comfortTotal = 0
      let varianceTotal = 0
      newReview.forEach( review => {
        comfortTotal += review.comfort_index
        varianceTotal += review.weather_variance
      })
      let totalReviews = newReview.length
      let averageComfort = Math.round(comfortTotal / totalReviews)
      let averageVariance = Math.round(varianceTotal / totalReviews)
      this.setState({
        reviews: newReview,
        averageComfort: averageComfort,
        averageVariance: averageVariance
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  componentDidMount() {
    fetch(`/api/v1/cities/${this.props.params.id}`)
    .then(response => {
      if (response.ok) {
        return response;
      } else if (response.status === 404) {
          window.location.href = '/cities'
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
    })

    .then(response => response.json())
    .then(body => {
      let newCity = body;
      let comfortTotal = 0
      let varianceTotal = 0
      newCity.reviews.forEach( review => {
        comfortTotal += review.comfort_index
        varianceTotal += review.weather_variance
      })
      let totalReviews = newCity.reviews.length
      let averageComfort = Math.round(comfortTotal / totalReviews)
      let averageVariance = Math.round(varianceTotal / totalReviews)
      this.setState({
        city: newCity.city,
        reviews: newCity.reviews,
        averageComfort: averageComfort,
        averageVariance: averageVariance
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
          this.setState({ admin: currentUser.admin });
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
      this.setState({
        reviews: body.reviews
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  deleteCity() {
    fetch(`/api/v1/cities/${this.props.params.id}`, {
      credentials: 'same-origin',
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
        throw(error);
      }
    })

    window.location.href = '/cities'
  }


  render() {
    let addNewReview = (formPayload) => this.addNewReview(formPayload)
    let reviews = this.state.reviews.map(review => {
        let handleDelete = () => {this.deleteReview(review.id)
      }

      return(
        <ReviewShowTile
          key={review.id}
          id={review.id}
          city_id={review.city_id}
          body={review.body}
          comfort_index={review.comfort_index}
          weather_variance={review.weather_variance}
          currentUser={this.state.currentUser}
          upvotes={review.upvotes}
          downvotes={review.downvotes}
          creator={review.user_id}
          handleDelete={handleDelete}
          admin={this.state.admin}
        />
      )
    })

    if (this.state.currentUser != null ) {
      return(
        <div>
          <CityShowTile
            city_name={this.state.city.city_name}
            state={this.state.city.state}
            description={this.state.city.description}
            currentUserId={this.state.currentUser}
            cityCreator={this.state.city.user_id}
            cityId={this.state.city.id}
            admin={this.state.admin}
            cityDelete={this.deleteCity}
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
            currentUserId={this.state.currentUser}
            cityCreator={this.state.city.user_id}
            cityId={this.state.city.id}
            averageComfort={this.state.averageComfort}
            averageVariance={this.state.averageVariance}
          />
          {reviews}
        </div>
      )
    }
  }
}

export default CityShowContainer;

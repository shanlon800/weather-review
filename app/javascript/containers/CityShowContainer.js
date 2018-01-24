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
    }
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
  render() {
    let reviews = this.state.reviews.map(review => {
      return(
        <ReviewShowTile
          key={review.id}
          body={review.body}
          comfort_index={review.comfort_index}
          weather_variance={review.weather_variance}
        />
      )
    })
    return(
      <div>
      <CityShowTile
        city_name={this.state.city.city_name}
        state={this.state.city.state}
        description={this.state.city.description}
      />
      <ReviewFormContainer />
      {reviews}
      </div>
    )
  }
}

export default CityShowContainer;

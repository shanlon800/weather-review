import React, { Component } from 'react';
import CityTile from '../components/CityTile'

class CitiesIndexContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cities: []
    }
  }

  componentDidMount() {
  fetch('/api/v1/cities')
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
      let newCities = body;
      this.setState({ cities: newCities });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
}


  render() {
    let cities = this.state.cities.map(city => {
      return(
        <CityTile
          key={city.id}
          city_name={city.city_name}
          state={city.state}
          description={city.description}
          banner={city.banner}
          id={city.id}
        />
      )
    })
    return (
      <div className="index">
        {cities}
      </div>
    )
  }
}

export default CitiesIndexContainer;

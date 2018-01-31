class Api::V1::CitiesController < ApplicationController
  def index
    render json: City.all
  end

  def show
    city = City.find(params[:id])
    reviews = city.reviews
    render json: {city: city, reviews: reviews}
  end

end

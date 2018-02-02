class Api::V1::CitiesController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:destroy]

  def index
    render json: City.all
  end

  def show
    city = City.find(params[:id])
    reviews = city.reviews
    render json: {city: city, reviews: reviews}
  end

  def destroy
    city = City.find(params[:id])
    if current_user.admin
      city.destroy
    else
      render json: { errors: "Access Denied" }
    end
  end

end

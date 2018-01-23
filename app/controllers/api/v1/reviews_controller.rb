class Api::V1::ReviewsController < ApplicationController
  def index
    city_id = params[:city_id]
    city_reviews = Review.where(city_id: city_id)
    render json: city_reviews
  end
end

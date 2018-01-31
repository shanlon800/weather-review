class Api::V1::ReviewsController < ApplicationController
  def index
    city_id = params[:city_id]
    review_objects = Review.where(city_id: city_id)
    render json: review_objects
  end
end

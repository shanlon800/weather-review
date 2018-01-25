class Api::V1::ReviewsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]
  def index
    city_id = params[:city_id]
    city_reviews = Review.where(city_id: city_id)
    render json: city_reviews
  end

  def create
    data = JSON.parse(request.body.read)
    binding.pry
  end
end

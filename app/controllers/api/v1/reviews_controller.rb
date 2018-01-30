class Api::V1::ReviewsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]
  def index
    city_id = params[:city_id]
    city_reviews = Review.where(city_id: city_id)
    render json: city_reviews
  end

  def create
    review = Review.new(review_params)
    if review.save
      render json: review
    else
      render json: { error: review.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def review_params
    params.require(:review).permit(
      :body,
      :comfort_index,
      :weather_variance,
      :city_id,
      :user_id
    )
  end
end

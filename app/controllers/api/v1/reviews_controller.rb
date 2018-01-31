class Api::V1::ReviewsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create, :destroy]
  def index
    city_id = params[:city_id]
    city_reviews = Review.where(city_id: city_id)
    render json: city_reviews
  end

  def create
    if current_user != nil
      review = Review.new(review_params)
      if review.save
        render json: review
      else
        render json: { error: review.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { errors: "Access Denied" }, status: 401
    end
  end

  def destroy
    review = Review.find(params[:id])
    if current_user.id == review.user_id || current_user.admin == true
      if review.destroy
        city_id = params[:city_id]
        city_reviews = Review.where(city_id: city_id)
        render json: city_reviews
      else
        render errors
      end
    else
      render json: { errors: "Access Denied" }, status: 401
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

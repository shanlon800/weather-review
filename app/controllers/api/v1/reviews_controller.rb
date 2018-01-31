class Api::V1::ReviewsController < ApplicationController
  before_action :authorize_user, except: [:index]
  skip_before_action :verify_authenticity_token, only: [:create, :destroy]

  def index
    city_id = params[:city_id]
    review_objects = Review.where(city_id: city_id)
    render json: review_objects
  end

  def create
    review = Review.new(review_params)
    if review.save
      render json: { review: review }
    else
      render json: { error: review.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    review = Review.find(params[:id])
    if current_user.id == review.user_id || current_user.admin == true
      if review.destroy
        city_id = params[:city_id]
        city_reviews = Review.where(city_id: city_id)
        render json: {reviews: city_reviews }
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

    def authorize_user
      if !user_signed_in?
        raise ActionController::RoutingError.new("Not Found")
      end
    end
end

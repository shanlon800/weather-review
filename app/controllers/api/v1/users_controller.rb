class Api::V1::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token
  protect_from_forgery unless: -> { request.format.json? }

  def index
    if current_user
      @current_user = current_user
      @reviews = Review.where(user_id: @current_user.id)
      @cities = City.where(user_id: @current_user.id)
      render json: {current_user: @current_user, reviews: @reviews, cities: @cities}
    else
      render json: {current_user: nil, message: "Please sign in."}
    end
  end

end

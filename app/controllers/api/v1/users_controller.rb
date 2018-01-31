class Api::V1::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token
  protect_from_forgery unless: -> { request.format.json? }

  def index
    if current_user
      @current_user = current_user
      @user_cities = @current_user.cities.as_json
      @reviews = @current_user.reviews.as_json(methods: [:upvotes, :downvotes])
      render json: {current_user: @current_user, reviews: @reviews, cities: @user_cities}
    else
      render json: {current_user: nil, message: "Please sign in.", status: 401}
    end

  end

end

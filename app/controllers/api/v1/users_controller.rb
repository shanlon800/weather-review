class Api::V1::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token
  protect_from_forgery unless: -> { request.format.json? }

  def index
    if current_user
      @current_user = current_user
      review_objects = Review.where(user_id: @current_user.id)
      @reviews = []

      review_objects.each do |obj|
        hash = {}
        votes = obj.votes

        hash[:id] = obj[:id]
        hash[:city_id] = obj[:city_id]
        hash[:user_id] = obj[:user_id]
        hash[:body] = obj[:body]
        hash[:comfort_index] = obj[:comfort_index]
        hash[:weather_variance] = obj[:weather_variance]
        hash[:create_at] = obj[:create_at]
        hash[:updated_at] = obj[:updated_at]
        hash[:upvotes] = 0
        hash[:downvotes] = 0
        votes.each do |v|
          if v[:vote] == true
            hash[:upvotes] = hash[:upvotes] + 1
          elsif v[:vote] == false
            hash[:downvotes] = hash[:downvotes] + 1
          end
        end
        @reviews << hash
      end

      @cities = City.where(user_id: @current_user.id)
      render json: {current_user: @current_user, reviews: @reviews, cities: @cities}
    else
      render json: {current_user: nil, message: "Please sign in.", status: 401}
    end
  end
end

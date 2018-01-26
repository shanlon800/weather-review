class Api::V1::ReviewsController < ApplicationController
  def index
    city_id = params[:city_id]
    review_objects = Review.where(city_id: city_id)

    city_reviews = []

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
      city_reviews << hash
    end
    render json: city_reviews
  end
end

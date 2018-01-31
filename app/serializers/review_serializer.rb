class ReviewSerializer < ActiveModel::Serializer
  attributes :city_id, :user_id, :body, :comfort_index, :weather_variance, :created_at, :updated_at, :upvotes, :downvotes

end

class ReviewSerializer < ActiveModel::Serializer
  attributes :city_id, :user_id, :body, :comfort_index, :weather_variance, :created_at, :updated_at, :upvotes, :downvotes

  def upvotes
    count = 0
    object.votes.each do |v|
      if v[:vote] == 1
        count += v[:vote]
      end
    end
    count
  end

  def downvotes
    count = 0
    object.votes.each do |v|
      if v[:vote] == -1
        count += v[:vote]
      end
    end
    count
  end
end

class Review < ApplicationRecord
  belongs_to :user
  belongs_to :city
  has_many :votes

  validates :comfort_index, presence: true, numericality: true, format: { with: /(?<!\S)[1-5](?!\S)/, message: "must be a number between 1 and 5" }
  validates :weather_variance, presence: true, numericality: true, format: { with: /(?<!\S)[1-5](?!\S)/, message: "must be a number between 1 and 5" }

  def upvotes
    count = 0
    self.votes.each do |v|
      if v[:vote] == 1
        count += v[:vote]
      end
    end
    count
  end

  def downvotes
    count = 0
    self.votes.each do |v|
      if v[:vote] == -1
        count += v[:vote]
      end
    end
    count
  end
end

class Review < ApplicationRecord
  belongs_to :user
  belongs_to :city

  validates :comfort_index, presence: true, numericality: true, format: { with: /(?<!\S)[1-5](?!\S)/, message: "must be a number between 1 and 5" }
  validates :weather_variance, presence: true, numericality: true, format: { with: /(?<!\S)[1-5](?!\S)/, message: "must be a number between 1 and 5" }

end

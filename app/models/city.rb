class City < ApplicationRecord
  belongs_to :user

  validates :city_name, presence: true
  validates :state, presence: true
  
end

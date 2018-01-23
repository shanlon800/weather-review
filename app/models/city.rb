class City < ApplicationRecord
  belongs_to :user
  has_many :reviews

  validates :city_name, presence: true
  validates :state, presence: true
  
end

class City < ApplicationRecord
  mount_uploader :banner, BannerUploader
  belongs_to :user
  has_many :reviews

  validates :city_name, presence: true
  validates :state, presence: true

end

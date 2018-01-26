class User < ApplicationRecord
  has_many :cities
  has_many :reviews, through: :cities
  has_many :votes, through: :reviews
  mount_uploader :avatar, AvatarUploader
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

end

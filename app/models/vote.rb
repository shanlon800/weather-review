class Vote < ApplicationRecord
  belongs_to :review
  belongs_to :user

  validates :vote, numericality: { :greater_than_or_equal_to => -1, :less_than_or_equal_to => 1 }
end

class Vote < ApplicationRecord
  belongs_to :review
  belongs_to :user

  validates :vote, inclusion: { in: [true, false, nil] }
end

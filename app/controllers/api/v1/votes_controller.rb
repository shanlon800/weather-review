class Api::V1::VotesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    review_id = params[:review_id]
    vote_object = Vote.where(review_id: review_id)

    render json: vote_object#, except: :id
  end

  def create
    if current_user != nil
      vote = Vote.new(vote_params)
      if vote.save
        render json: vote
      else
        render json: { error: vote.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { errors: "Access Denied" }, status: 401
    end
  end

  def edit
    binding.pry
  end

  private

  def vote_params
    parameters = { user_id: params[:user_id], review_id: params[:review_id], vote: params[:vote] }
    parameters
  end
end

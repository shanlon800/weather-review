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

  def update
    if current_user != nil
      vote = Vote.find(params[:id])
      old_vote = vote.vote
      vote.vote = params[:vote]
      if vote.save
        render json: { new: vote, old: old_vote }
      else
        render json: { error: vote.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { errors: "Access Denied" }, status: 401
    end
  end

  def destroy
    if current_user != nil
      vote = Vote.find(params[:id])
      old_vote = vote.vote
      if vote.destroy
        render json: { vote: 0, old: old_vote }
      else
        render errors
      end
    else
      render json: { errors: "Access denied!" }, status: 401
    end
  end

  private

  def vote_params
    parameters = { user_id: params[:user_id], review_id: params[:review_id], vote: params[:vote] }
    parameters
  end
end

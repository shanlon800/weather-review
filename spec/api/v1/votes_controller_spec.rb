require 'rails_helper'
include Warden::Test::Helpers

RSpec.describe Api::V1::VotesController, type: :controller do
  let!(:user_one) {FactoryBot.create(:user)}
  let!(:user_two) {FactoryBot.create(:user)}
  let!(:city_one) {City.create!(city_name: "Boston", state: "MA", user_id: user_two.id)}
  let!(:review_one) { Review.create!(city_id: city_one.id, user_id: user_two.id, body: "Boston is alright. It gets cold.", comfort_index: 3, weather_variance: 4) }

  describe "Get#index" do
    let!(:upvote) { Vote.create!(user_id: user_one.id, review_id: review_one.id, vote: 1)}
    let!(:downvote) { Vote.create!(user_id: user_two.id, review_id: review_one.id, vote: -1)}

    it 'should return the signed in current user and the list of their re' do
      sign_in(user_two, :scope => :user)
      get :index, params: { city_id: city_one.id, review_id: review_one.id }

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq('application/json')

      expect(returned_json.length).to eq 2

      expect(returned_json[0]['user_id']).to eq user_one.id
      expect(returned_json[1]['user_id']).to eq user_two.id
      expect(returned_json[0]['review_id']).to eq review_one.id
      expect(returned_json[1]['review_id']).to eq review_one.id
    end
  end

  describe "Post#create" do

    it 'creates a new vote' do
      sign_in(user_two, :scope => :user)

      post_json = {vote: { review_id: review_one.id, user_id: user_two.id, vote: 1}}
      review_votes = Vote.where(review_id: review_one.id)
      prev_count = review_votes.count

      post(:create, params: post_json)
      expect(Vote.where(review_id: review_one.id).count).to eq(prev_count + 1)
    end

    it 'will not create if not signed in' do
      post_json = {vote: { review_id: review_one.id, user_id: user_two.id, vote: 1}}
      review_votes = Vote.where(review_id: review_one.id)
      prev_count = review_votes.count

      post(:create, params: post_json)

      expect(Vote.where(review_id: review_one.id).count).to eq(prev_count)
    end
  end

  describe "Patch#update" do
    let!(:upvote) { Vote.create!(user_id: user_one.id, review_id: review_one.id, vote: 1)}
    it 'updates a vote' do
      sign_in(user_two, :scope => :user)

      review_votes = Vote.where(review_id: review_one.id)
      post_json = {vote: { review_id: review_one.id, user_id: user_two.id, vote: 1}}
      new_post_json = {vote: { review_id: review_one.id, user_id: user_two.id, vote: 1}}
      prev_count = review_votes.count

      post(:create, params: post_json)
      current_count = review_votes.count

      patch(:update, params: {id: Vote.last.id, vote: new_post_json})
      expect(Vote.where(review_id: review_one.id).count).to eq(prev_count + 1)
      expect(Vote.where(review_id: review_one.id).count).to eq(current_count)
      expect(Vote.last[:vote]).to eq(new_post_json[:vote][:vote])
    end

    it 'will not update a vote if you are not signed in' do
      new_post_json = {vote: { review_id: review_one.id, user_id: user_one.id, vote: -1}}

      patch(:update, params: {id: Vote.last.id, vote: new_post_json})
      expect(Vote.last[:vote]).to eq(upvote[:vote])
    end
  end

  describe 'Post#destroy' do
    let!(:upvote) { Vote.create!(user_id: user_one.id, review_id: review_one.id, vote: 1)}
    it 'deletes a vote' do
      sign_in(user_two, :scope => :user)

      post_json = {vote: { review_id: review_one.id, user_id: user_two.id, vote: -1}}
      post(:create, params: post_json)
      review_votes = Vote.where(review_id: review_one.id)
      prev_count = review_votes.count

      delete(:destroy, params: {id: Vote.last.id})

      expect(Vote.where(review_id: review_one.id).count).to eq(prev_count - 1)
      expect(Vote.last[:vote]).to eq(upvote[:vote])
    end

    it 'will not allow vote to be deleted if not signed in' do
      review_votes = Vote.where(review_id: review_one.id)
      prev_count = review_votes.count
      delete(:destroy, params: {id: Vote.last.id})
      expect(Vote.where(review_id: review_one.id).count).to eq(prev_count)
      expect(Vote.last[:vote]).to eq(upvote[:vote])
    end
  end
end

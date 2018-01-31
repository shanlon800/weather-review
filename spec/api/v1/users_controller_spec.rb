require 'rails_helper'
include Warden::Test::Helpers

RSpec.describe Api::V1::UsersController, type: :controller do


  describe "GET#index" do
    let!(:user) {FactoryBot.create(:user)}
    let!(:city_one) {City.create!(city_name: "Boston", state: "MA", user_id: user.id)}
    let!(:review_one) { Review.create!(city_id: city_one.id, user_id: user.id, body: "Boston is alright. It gets cold.", comfort_index: 3, weather_variance: 4) }
    let!(:upvote) { Vote.create!(user_id: user.id, review_id: review_one.id, vote: 1)}
    let!(:downvote) { Vote.create!(user_id: user.id, review_id: review_one.id, vote: -1)}
    it 'should return the signed in current user and the list of their reviews' do

      sign_in(user, :scope => :user)
      get :index

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200

      expect(response.content_type).to eq('application/json')
      expect(returned_json.length).to eq 3
      expect(returned_json["current_user"]["email"]).to eq user.email
      expect(returned_json["reviews"][0]["body"]).to eq review_one.body
      expect(returned_json["reviews"][0]["upvotes"]).to eq 1
      expect(returned_json["reviews"][0]["downvotes"]).to eq -1
      expect(returned_json["cities"][0]["city_name"]).to eq city_one.city_name

    end
  end

  describe "GET#index" do
    let!(:user) {FactoryBot.create(:user)}
    let!(:city_one) {City.create!(city_name: "Boston", state: "MA", user_id: user.id)}
    let!(:review_one) { Review.create!(city_id: city_one.id, user_id: user.id, body: "Boston is alright. It gets cold.", comfort_index: 3, weather_variance: 4) }
    it 'if no user is signed out, it should return null and an error message' do


      get :index

      returned_json = JSON.parse(response.body)

      expect(response.content_type).to eq('application/json')
      expect(returned_json.length).to eq 3

      expect(returned_json["current_user"]).to eq nil
      expect(returned_json["message"]).to eq "Please sign in."
      expect(returned_json["status"]).to eq 401

    end
  end
end

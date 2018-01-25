require 'rails_helper'
include Warden::Test::Helpers

RSpec.describe Api::V1::UsersController, type: :controller do


  describe "GET#index" do
    let!(:user) {FactoryBot.create(:user, id: 99)}
    let!(:city_one) {City.create(city_name: "Boston", state: "MA", user_id: user.id)}
    let!(:review_one) { Review.create!(city_id: city_one.id, user_id: user.id, body: "Boston is alright. It gets cold.", comfort_index: 3, weather_variance: 4) }
    it 'should return the current user and the list of their reviews' do

      sign_in(user, :scope => :user)
      get :index

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200

      expect(response.content_type).to eq('application/json')
      expect(returned_json.length).to eq 3

      expect(returned_json["current_user"]["email"]).to eq user.email
      expect(returned_json["reviews"][0]["body"]).to eq review_one.body
      expect(returned_json["cities"][0]["city_name"]).to eq city_one.city_name

    end
  end
end

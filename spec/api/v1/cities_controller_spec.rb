require 'rails_helper'

RSpec.describe Api::V1::CitiesController, type: :controller do
  let!(:user_1) { User.create(email: "email@example.com", password: "password1234")}
  let!(:city_one) {City.create(city_name: "Boston", state: "MA", user_id: user_1.id)}
  let!(:city_two) {City.create(city_name: "Brahston", state: "WA", user_id: user_1.id)}
  let!(:review_one) { Review.create!(city_id: city_one.id, user_id: user_1.id, body: "Boston is alright. It gets cold.", comfort_index: 3, weather_variance: 4) }
  let!(:review_two) { Review.create!(city_id: city_one.id, user_id: user_1.id, body: "Boston is . . . meh.", comfort_index: 4, weather_variance: 1) }
  let!(:review_three) { Review.create!(city_id: city_one.id, user_id: user_1.id, comfort_index: 2, weather_variance: 2) }

  describe "GET#index" do
    it 'should return a list of all cities' do
      get :index
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq('application/json')

      expect(returned_json.length).to eq 2
      expect(returned_json[0]['city_name']).to eq "Boston"
      expect(returned_json[0]['state']).to eq "MA"

      expect(returned_json[1]['city_name']).to eq "Brahston"
      expect(returned_json[1]['state']).to eq "WA"

    end
  end


  describe "GET#show" do
    it 'should return a show page with reviews for selected city' do
      get :show, params: {id: city_one.id}
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq 2
      expect(returned_json["city"]["city_name"]).to eq "Boston"
      expect(returned_json["reviews"][0]["body"]).to eq "Boston is alright. It gets cold."
      expect(returned_json["reviews"][0]["weather_variance"]).to eq 4
      expect(returned_json["reviews"][0]["comfort_index"]).to eq 3

    end
  end
end

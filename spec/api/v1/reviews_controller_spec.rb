require 'rails_helper'

RSpec.describe Api::V1::ReviewsController, type: :controller do
  let!(:user_1) { User.create!(email: "email@example.com", password: "password1234")}
  let!(:city_one) {City.create!(city_name: "Boston", state: "MA", user_id: user_1.id)}
  let!(:city_two) {City.create!(city_name: "Brahston", state: "WA", user_id: user_1.id)}

  let!(:review_one) { Review.create!(city_id: city_one.id, user_id: user_1.id, body: "Boston is alright. It gets cold.", comfort_index: 3, weather_variance: 4) }
  let!(:review_two) { Review.create!(city_id: city_one.id, user_id: user_1.id, body: "Boston is . . . meh.", comfort_index: 4, weather_variance: 1) }
  let!(:review_three) { Review.create!(city_id: city_one.id, user_id: user_1.id, comfort_index: 2, weather_variance: 2) }

  let!(:upvote_one) { Vote.create!(user_id: user_1.id, review_id: review_one.id, vote: true)}
  let!(:upvote_two) { Vote.create!(user_id: user_1.id, review_id: review_one.id, vote: true)}

  let!(:upvote_three) { Vote.create!(user_id: user_1.id, review_id: review_two.id, vote: true)}
  let!(:downvote_one) { Vote.create!(user_id: user_1.id, review_id: review_two.id, vote: false)}

  let!(:downvote_two) { Vote.create!(user_id: user_1.id, review_id: review_three.id, vote: false)}
  let!(:downvote_three) { Vote.create!(user_id: user_1.id, review_id: review_three.id, vote: false)}

  describe "Get#index" do
    it 'should return a list of all reviews based on the city_id' do
      get :index, params: { city_id: city_one.id }

      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq('application/json')

      expect(returned_json.length).to eq 3
      expect(returned_json[0]['city_id']).to eq city_one.id
      expect(returned_json[0]['body']).to eq "Boston is alright. It gets cold."
      expect(returned_json[0]['comfort_index']).to eq 3
      expect(returned_json[0]['upvotes']).to eq 2
      expect(returned_json[0]['downvotes']).to eq 0

      expect(returned_json[1]['city_id']).to eq city_one.id
      expect(returned_json[1]['body']).to eq "Boston is . . . meh."
      expect(returned_json[1]['weather_variance']).to eq 1
      expect(returned_json[1]['upvotes']).to eq 1
      expect(returned_json[1]['downvotes']).to eq 1

      expect(returned_json[2]['city_id']).to eq city_one.id
      expect(returned_json[2]['body']).to eq nil
      expect(returned_json[2]['weather_variance']).to eq 2
      expect(returned_json[2]['upvotes']).to eq 0
      expect(returned_json[2]['downvotes']).to eq 2
    end
  end
end

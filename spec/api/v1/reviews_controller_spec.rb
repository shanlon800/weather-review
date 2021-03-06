require 'rails_helper'

RSpec.describe Api::V1::ReviewsController, type: :controller do
  let!(:user_1) { User.create!(email: "email@example.com", password: "password1234")}
  let!(:user_2) { User.create!(email: "email2@example.com", password: "password1")}
  let!(:user_3) { User.create!(email: "admin@example.com", password: "password3", admin: true)}
  let!(:city_one) {City.create!(city_name: "Boston", state: "MA", user_id: user_1.id)}
  let!(:city_two) {City.create!(city_name: "Brahston", state: "WA", user_id: user_1.id)}

  let!(:review_one) { Review.create!(city_id: city_one.id, user_id: user_1.id, body: "Boston is alright. It gets cold.", comfort_index: 3, weather_variance: 4) }
  let!(:review_two) { Review.create!(city_id: city_one.id, user_id: user_1.id, body: "Boston is . . . meh.", comfort_index: 4, weather_variance: 1) }
  let!(:review_three) { Review.create!(city_id: city_one.id, user_id: user_1.id, comfort_index: 2, weather_variance: 2) }

  let!(:upvote_one) { Vote.create!(user_id: user_1.id, review_id: review_one.id, vote: 1)}
  let!(:upvote_two) { Vote.create!(user_id: user_3.id, review_id: review_one.id, vote: 1)}

  let!(:upvote_three) { Vote.create!(user_id: user_2.id, review_id: review_two.id, vote: 1)}
  let!(:downvote_one) { Vote.create!(user_id: user_1.id, review_id: review_two.id, vote: -1)}

  let!(:downvote_two) { Vote.create!(user_id: user_2.id, review_id: review_three.id, vote: -1)}
  let!(:downvote_three) { Vote.create!(user_id: user_3.id, review_id: review_three.id, vote: -1)}

  describe "Get#index" do
    it 'should return a list of all reviews based on the city_id' do
      get :index, params: { city_id: city_one.id }

      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq('application/json')
      review_data = returned_json["reviews"]

      expect(review_data.length).to eq 3

      expect(review_data[0]['city_id']).to eq city_one.id
      expect(review_data[0]['body']).to eq "Boston is alright. It gets cold."
      expect(review_data[0]['comfort_index']).to eq 3
      expect(review_data[0]['upvotes']).to eq 2
      expect(review_data[0]['downvotes']).to eq 0

      expect(review_data[1]['city_id']).to eq city_one.id
      expect(review_data[1]['body']).to eq "Boston is . . . meh."
      expect(review_data[1]['weather_variance']).to eq 1
      expect(review_data[1]['upvotes']).to eq 1
      expect(review_data[1]['downvotes']).to eq -1

      expect(review_data[2]['city_id']).to eq city_one.id
      expect(review_data[2]['body']).to eq nil
      expect(review_data[2]['weather_variance']).to eq 2
      expect(review_data[2]['upvotes']).to eq 0
      expect(review_data[2]['downvotes']).to eq -2
    end
  end


  describe "Post#create" do
    it 'creates a new review' do
      sign_in(user_1, :scope => :user)


      post_json = {review: { city_id: city_one.id, user_id: user_1.id, body: "Boston is meh", comfort_index: 3, weather_variance: 4}}
      city_reviews = Review.where(city_id: city_one.id)
      prev_count = city_reviews.count
      post(:create, params: post_json)
      expect(Review.where(city_id: city_one.id).count).to eq(prev_count + 1)
    end

    it 'will not create if not signed in and give an error' do
      post_json = {review: { city_id: city_one.id, user_id: user_1.id, body: "Boston is meh", comfort_index: 3, weather_variance: 4}}
      expect{ get :create }.to raise_error(ActionController::RoutingError)

    end
  end

  describe "Post#destroy" do
    it 'deletes a review' do
      sign_in(user_1, :scope => :user)


      city_reviews = Review.where(city_id: city_one.id)
      prev_count = city_reviews.count

      delete :destroy, params: {id: review_three.id}
      expect(Review.where(city_id: city_one.id).count).to eq(prev_count - 1)
    end

    it 'will not allow review to be deleted if not signed into same account that posted' do
      sign_in(user_2, :scope => :user)

      city_reviews = Review.where(city_id: city_one.id)
      prev_count = city_reviews.count

      delete :destroy, params: {id: review_three.id}
      expect(Review.where(city_id: city_one.id).count).to eq(prev_count)

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 401
      expect(response.content_type).to eq("application/json")
      expect(returned_json["errors"]).to eq "Access Denied"
    end

    it 'will not allow review to be deleted if not signed in' do
      sign_in(user_2, :scope => :user)

      city_reviews = Review.where(city_id: city_one.id)
      prev_count = city_reviews.count

      delete :destroy, params: {id: review_three.id}
      expect(Review.where(city_id: city_one.id).count).to eq(prev_count)

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 401
      expect(response.content_type).to eq("application/json")
      expect(returned_json["errors"]).to eq "Access Denied"
    end

    it "will allow an admin to delete another user's review" do
      sign_in(user_3, :scope => :user)

      city_reviews = Review.where(city_id: city_one.id)
      prev_count = city_reviews.count

      delete :destroy, params: {id: review_three.id}
      expect(Review.where(city_id: city_one.id).count).to eq(prev_count - 1)
    end
  end
end

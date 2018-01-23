require 'rails_helper'

RSpec.describe Api::V1::CitiesController, type: :controller do
  let!(:user_1) { User.create(email: "email@example.com", password: "password1234")}
  let!(:city_one) {City.create(city_name: "Boston", state: "MA", user_id: user_1.id)}
  let!(:city_two) {City.create(city_name: "Brahston", state: "WA", user_id: user_1.id)}

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
end

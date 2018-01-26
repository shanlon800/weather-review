require "rails_helper"
require 'carrierwave/test/matchers'


feature "user can add city" do
  scenario "user adds new city successfully" do

    visit new_city_path
    expect(page).to have_content "New City Form"

    fill_in 'Name', with: "Boston"
    fill_in 'State', with: "MA"
    fill_in 'Description', with: "The best city in east coast."

    click_button "Add City"

    expect(page).to have_content "City added successfully"
    expect(page).to have_content "Boston"
    expect(page).to have_content "The best city in east coast"
  end

  scenario "user does not provide proper information for a city" do
    visit new_city_path

    click_button "Add City"
    expect(page).to have_content "Name can't be blank"
    expect(page).to have_content "State can't be blank"

  end

  scenario "user can't add a city if not signed in" do

  visit cities_path
  expect(page).to have_content "Add New City"

  click_button "Add New City"
  expect(page).to have_content "You need to be signed in to add a City."
end

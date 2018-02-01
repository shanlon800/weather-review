require "rails_helper"
require 'carrierwave/test/matchers'


feature "user can add city" do
  User.create(email: 'user4@example.com', password: 'password2')

  scenario "user adds new city successfully" do

    visit new_city_path

    fill_in 'Email', with: 'user4@example.com'
    fill_in 'Password', with: 'password2'
    click_button 'Log in'

    visit new_city_path
    expect(page).to have_content "Add A New City"

    fill_in 'Name', with: "Boston"
    fill_in 'State', with: "MA"
    fill_in 'Description', with: "The best city in east coast."

    click_button "Submit"

    expect(page).to have_content "Your City has been added"

  end

  scenario "user does not provide proper information for a city" do
    visit new_city_path

    fill_in 'Email', with: 'user4@example.com'
    fill_in 'Password', with: 'password2'
    click_button 'Log in'

    visit new_city_path

    click_button "Submit"
    expect(page).to have_content "City name can't be blank"
    expect(page).to have_content "State can't be blank"

  end

  scenario "user can't add a city if not signed in" do

    visit cities_path
    click_on "Add New City"
    expect(page).to have_content "You need to be signed in to add a City."
  end
end

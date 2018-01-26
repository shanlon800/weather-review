require "rails_helper"

# [] A restaurant must have a name, address, city, state, and zip code. It can optionally have a description.
# [] Visiting the `/restaurants/new` path should display a form for creating a new restaurant.
# [] When adding a new restaurant, if I fill out the form correctly, I should see the page for the newly created restaurant.
# [] When adding a new restaurant, if I fill out the form incorrectly and submit the form, I should see the form and be displayed the validation errors.


feature "user can add city" do
  scenario "user adds new city successfully" do

    visit new_city_path
    expect(page).to have_content "New Restaurant Form"

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
end
describe City do
  include CarrierWave::Test::Matchers
    let(:user) { double('user') }
    let(:uploader) { City.new(user, :banner) }
    before do
      User.enable_processing = true
      File.open(path_to_file) { |f| uploader.store!(f) }
    end
    after do
      User.enable_processing = false
      uploader.remove!
    end
end

require 'rails_helper'



feature 'user can edit a city they have added' do
  # user_1 = User.create!(email: 'user5@example.com', password: 'password2')
  # city_one = City.create!(city_name: "Banana Stand", state: "CA", description: "There's always money..", user_id: user_1.id)
  # city_one.user_id = user_1.id
  let!(:user_2) { User.create!(email: "email2@example.com", password: "password1")}
  let!(:city_one) {City.create!(city_name: "Banana Stand", state: "CA", description: "There's always money..", user_id: user_2.id)}

  before(:each) do
    visit '/'
    click_on "Sign In"
    fill_in 'Email', with: 'email2@example.com'
    fill_in 'Password', with: 'password1'
    click_button 'Log in'
  end


  scenario 'User can see the entered city details' do
    visit edit_city_path(city_one.id)
    expect(page).to have_content "Edit City"
    expect(page).to have_field("Name", with: "Banana Stand")
    expect(page).to have_field("State", with: "CA")
    expect(page).to have_field("Description", with: "There's always money..")

  end

  scenario 'User can edit the city details' do
    visit edit_city_path(city_one.id)
    fill_in 'Description', with: "There's always money...in the Banana Stand!"
    click_on 'Submit'
    expect(page).to have_content "Your City has been updated!"

    visit edit_city_path(city_one.id)
    expect(page).to have_field("Name", with: "Banana Stand")
    expect(page).to have_field("State", with: "CA")
    expect(page).to have_field("Description", with: "There's always money...in the Banana Stand!")
  end
end

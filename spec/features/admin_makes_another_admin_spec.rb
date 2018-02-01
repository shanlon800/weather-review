require 'rails_helper'

feature 'admin can make another user an admin' do
  let!(:admin_1) { User.create!(email: "admin@example.com", password: "password1", admin: true)}
  let!(:user_2) { User.create!(email: "email2@example.com", password: "password1")}

  scenario 'user can view a list of all users' do
    visit new_user_session_path

    fill_in 'Email', with: admin_1.email
    fill_in 'Password', with: admin_1.password

    click_button 'Log in'
    expect(page).to have_content('Signed in successfully')

    visit users_path

    expect(page).to have_content('Admin Page')
    expect(page).to have_content('admin@example.com')
    expect(page).to have_content('email2@example.com')


  end

  # scenario 'user can check the box and submit to convert user to admin' do
  #   visit new_user_session_path
  #
  #   fill_in 'Email', with: admin_1.email
  #   fill_in 'Password', with: admin_1.password
  #
  #   click_button 'Log in'
  #   expect(page).to have_content('Signed in successfully')
  #
  #   visit users_path
  #   # choose('true', option: "radio-#{user_2.id}")
  #   choose("true", id: "user_admin_true")
  #     # , :id: "radio-#{user_2.id}")
  #   save_and_open_page
  #   click_button 'Submit'
  #
  # end

  scenario 'admin can delete another user' do
    visit new_user_session_path

    fill_in 'Email', with: admin_1.email
    fill_in 'Password', with: admin_1.password

    click_button 'Log in'
    expect(page).to have_content('Signed in successfully')

    visit users_path
    click_button('delete', id: "delete-#{user_2.id}")
    expect(page).to have_no_content("email2@example.com")

  end
end

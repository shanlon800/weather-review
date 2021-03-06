require 'rails_helper'
require 'carrierwave/test/matchers'

describe 'PUT#edit_user_registration_path' do

scenario 'authenticated user updates profile' do
  user = User.create(email: "email@example.com", password: "password1234")

  visit new_user_session_path

  fill_in 'Email', with: user.email
  fill_in 'Password', with: user.password

  click_button 'Log in'

  expect(page).to have_content('Signed in successfully')
  expect(page).to have_content('Sign Out')

  visit edit_user_registration_path

  fill_in 'user[current_password]', with: user.password

  RSpec.configure do |config|
    config.after(:each) do
      if Rails.env.test? || Rails.env.cucumber?
        FileUtils.rm_rf(Dir["#{Rails.root}/uploads/user/avatar"])
      end
    end
  end

  click_button 'Update'

    expect(page).to have_content('Your account has been updated successfully.')

  end

  scenario 'authenticated user cancels profile' do
    user = User.create(email: "emails@example.com", password: "password12345")

    visit new_user_session_path

    fill_in 'Email', with: user.email
    fill_in 'Password', with: user.password

    click_button 'Log in'

    expect(page).to have_content('Signed in successfully')
    expect(page).to have_content('Sign Out')

    visit edit_user_registration_path

    click_link "Cancel my account"

    expect(page).to have_content('Bye! Your account has been successfully cancelled. We hope to see you again soon.')
  end
end

  describe User do
    include CarrierWave::Test::Matchers
      let(:user) { double('user') }
      let(:uploader) { User.new(user, :avatar) }
      before do
        User.enable_processing = true
        File.open(path_to_file) { |f| uploader.store!(f) }
      end
      after do
        User.enable_processing = false
        uploader.remove!
      end
  end

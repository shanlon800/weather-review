require 'rails_helper'

describe City do

  it { should have_valid(:city_name).when("a city name") }
  it { should have_valid(:state).when("a cool state") }

  it { should_not have_valid(:city_name).when(nil, "") }
  it { should_not have_valid(:state).when(nil, "") }

end

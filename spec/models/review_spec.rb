require 'rails_helper'

describe Review do
  it { should have_valid(:comfort_index).when(3) }
  it { should have_valid(:weather_variance).when(3) }

  it { should_not have_valid(:comfort_index).when(7) }
  it { should_not have_valid(:weather_variance).when(13) }

  it { should_not have_valid(:comfort_index).when(nil, "") }
  it { should_not have_valid(:weather_variance).when(nil, "") }
end

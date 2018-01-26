require 'rails_helper'

describe Vote do
  it { should have_valid(:vote).when(true) }
  it { should have_valid(:vote).when(false) }
  it { should have_valid(:vote).when(nil) }
end

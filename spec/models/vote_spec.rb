require 'rails_helper'

describe Vote do
  it { should have_valid(:vote).when(1) }
  it { should have_valid(:vote).when(-1) }
  it { should have_valid(:vote).when(0) }
end

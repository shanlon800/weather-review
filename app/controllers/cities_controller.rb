class CitiesController < ApplicationController
  def index
    @cities = City.all
  end

  def new
    if user_signed_in?
      @city = City.new
    else
      flash[:notice] = "You need to be signed in to add a City."
      redirect_to new_user_session_path
    end
  end

  def create
    @city = City.new(city_params.merge(user_id: current_user.id))
    unless user_signed_in?
      flash[:notice] = "You need to be signed in to add a City."
      redirect_to new_user_session_path
    end
    if @city.save
       flash[:notice] = "Your City has been added."
       redirect_to cities_path
    else
      flash[:error] = @city.errors.full_messages.join(". ")
      render :new
    end
  end

  protected
  def city_params
    params.require(:city).permit(:city_name, :state, :description, :user_id, :banner)
  end

end

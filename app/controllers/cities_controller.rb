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
    if @city.save
       flash[:notice] = "Your City has been added"
       redirect_to cities_path
    else
      flash[:error] = @city.errors.full_messages.join(". ")
      render :new
    end
  end

  def edit
    @city = City.find(params[:id])
    if user_signed_in?
      if @city.user_id != current_user.id
        flash[:notice] = "You are not allowed to edit this city!"
        redirect_to city_path(@city.id)
      else
        @city
      end
    else
      flash[:notice] = "You need to be signed in to edit a city"
      redirect_to new_user_session_path
    end
  end

  def update
    @city = City.find(params[:id])
    if @city.update_attributes(city_params)
      flash[:notice] = "Your City has been updated!"
      redirect_to city_path(@city)
    else
      flash[:error] = @city.errors.full_messages.join(". ")
      render :edit
    end
  end

  protected
  def city_params
    params.require(:city).permit(:city_name, :state, :description, :user_id, :banner)
  end

end

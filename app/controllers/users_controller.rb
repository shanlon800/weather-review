class UsersController < ApplicationController
  def index
    if user_signed_in? && current_user.admin == true
      @users = User.order(:email)
      @admin_collection = [
        [true, "true"],
        [false, "false"]
      ]
    else
      raise ActionController::RoutingError.new('Not Found')
    end
  end

  def update
    if user_signed_in? && current_user.admin == true
      @user = User.find(params[:id])
      @user.admin = user_params[:admin]
      @user.save
    else
      raise ActionController::RoutingError.new('Not Found')
    end

  end

  def destroy
    if user_signed_in? && current_user.admin == true
      User.delete(params[:id])
      @users = User.order(:email)
      @admin_collection = [
        [true, "true"],
        [false, "false"]
      ]
      render :index
    else
      raise ActionController::RoutingError.new('Not Found')
    end
  end

  protected
  def user_params
    params.require(:user).permit(:email, :avatar, :admin)
  end
end

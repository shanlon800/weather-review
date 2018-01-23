Rails.application.routes.draw do
  root 'static_pages#index'
  devise_for :users

  get '/' => 'static_pages#index'

  namespace :api do
    namespace :v1 do
      resources :cities, only: [:index]
    end
  end

end

Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users

  namespace :api do
    namespace :v1 do
      resources :cities, only: [:index]
      resources :cities, only: [:show] do
        resources :reviews, only: [:index]
      end
    end
  end

end

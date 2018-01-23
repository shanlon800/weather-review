Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users

  namespace :api do
    namespace :v1 do
      resources :cities, only: [:index, :show] do
        resources :reviews, only: [:index]
      end
    end
  end

end

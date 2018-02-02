Rails.application.routes.draw do
  root 'static_pages#index'
  devise_for :users

  # get '*/path' => 'static_pages#index'
  get '/cities' => 'static_pages#index'
  get '/cities/new' => 'new_city_path'
  get '/cities/:id' => 'static_pages#index'


  namespace :api do
    namespace :v1 do
      resources :cities do
        resources :reviews, only: [:index, :destroy]
      end

      resources :reviews, only: [:create, :destroy] do
        resources :votes, only: [:index]
      end
      resources :users, only: [:index]
      resources :votes, only: [:create, :update, :destroy]
    end
  end

  resources :cities, only: [:new, :create, :index, :edit, :update]
  resources :users, only: [:index, :update, :destroy]

end

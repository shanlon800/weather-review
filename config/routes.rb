Rails.application.routes.draw do
  root 'static_pages#index'
  devise_for :users

  get '*/path' => 'static_pages#index'
  get '/cities' => 'static_pages#index'
  get '/cities/:id' => 'static_pages#index'

  namespace :api do
    namespace :v1 do
      resources :cities, only: [:index, :show, :create] do
        resources :reviews, only: [:index, :destroy]
      end

      resources :reviews, only: [:create, :destroy]
      resources :users, only: [:index]
    end
  end

end

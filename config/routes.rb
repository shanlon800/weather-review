Rails.application.routes.draw do
  root 'static_pages#index'
  devise_for :users

  get '*/path' => 'static_pages#index'

  namespace :api do
    namespace :v1 do
      resources :cities, only: [:index, :show] do
        resources :reviews, only: [:index]
      end
    end
  end

end

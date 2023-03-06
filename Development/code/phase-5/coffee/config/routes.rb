Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :coffee, only: [:index, :destroy, :create, :show]
      resources :review, only: [:index, :destroy, :create, :show]
      resources :user, only: [:show]
      post '/api/v1/authentication/sign_up', to: '/api/v1/authentication#sign_up'
      post '/api/v1/authentication/sign_in', to: '/api/v1/authentication#sign_in'
      get '/api/v1/locations/location', to: '/api/v1/locations#location'
    end
  end
  # devise_for :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end

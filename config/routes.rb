Rails.application.routes.draw do
  resources :nodes
  root to: 'nodes#show'
end

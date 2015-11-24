Rails.application.routes.draw do
  root 'home#index'
  
  scope '/api' do
    resources :trucks, except: [:new, :edit] do
       get 'search', :on => :collection
    end
  end
end

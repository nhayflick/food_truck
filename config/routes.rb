Rails.application.routes.draw do
  scope '/api' do
    resources :trucks, except: [:new, :edit] do
       get 'search', :on => :collection
    end
  end
end

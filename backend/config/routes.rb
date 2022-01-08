Rails.application.routes.draw do
  namespace 'api' do
    namespace 'v1' do
      resources :runs
    end
  end
end
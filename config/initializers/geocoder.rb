# config/initializers/geocoder.rb
Geocoder.configure(

  # geocoding service (see below for supported options):
  :lookup => :google,

  # to use an API key:
  :api_key => ENV["GOOGLE_LOCATIONS_KEY"],

  # geocoding service request timeout, in seconds (default 3):
  :timeout => 2,

  :use_https => true

)
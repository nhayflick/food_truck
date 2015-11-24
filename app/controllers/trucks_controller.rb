class TrucksController < ApplicationController
  before_action :set_truck, only: [:show]

  # GET /trucks
  # GET /trucks.json
  def index
    @trucks = Truck.all

    render json: @trucks
  end

  # GET /trucks/1
  # GET /trucks/1.json
  def show
    render json: @truck
  end

  def search
    @result = {};

    # Reverse Geocoding Input
    if params[:lat].present? && params[:lng].present?

      @result[:lat], @result[:lng] = params[:lat], params[:lng]

      begin
        @result[:address] = Geocoder.search(@result[:lat] + ',' + @result[:lng]).first.formatted_address
      rescue StandardError => error
        return render :json => {:error => 'Geocoder Not Responding'}, :status => 500
      end

    #  RegularGeocoding Input
    elsif params[:address].present?

      @result[:address] = params[:address]

      begin
        coords = Geocoder.search(@result[:address], :bounds => [[36.8, -122.75], [37.8, -121.75]]).first.geometry['location']
      rescue StandardError => error
        return render :json => {:error => 'Geocoder Not Responding'}, :status => 500
      end

      @result[:lat], @result[:lng] = coords['lat'].to_f, coords['lng'].to_f
    
    # No valid search params present
    else 
       return render :json => {:error => 'Missing Required Params'}, :status => 422
    end

    query = @result[:lat].to_s + ',' + @result[:lng].to_s;
    @result[:trucks] = Truck.near(query, 0.5, :order => 'distance').limit(12)

    render json: @result
  end


  private

    def set_truck
      @truck = Truck.find(params[:id])
    end

    def truck_params
      params.require(:truck).permit(:name, :location_id, :location_description, :address, :food_description, :lat, :lng, :hours_description)
    end
end


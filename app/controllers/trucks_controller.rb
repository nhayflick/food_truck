class TrucksController < ApplicationController
  before_action :set_truck, only: [:show]

  # GET /trucks
  # GET /trucks.json
  def index
    if params[:search].present?
      @trucks = Truck.near(params[:search], 0.5, :order => 'distance').limit(12)
    else
      @trucks = Truck.all
    end

    render json: @trucks
  end

  # GET /trucks/1
  # GET /trucks/1.json
  def show
    render json: @truck
  end

  def search
    @result = params;
    if @result[:lat].present? && @result[:lng].present?
      @result[:address] = Geocoder.search(@result[:lat] + ',' + @result[:lng]).first.formatted_address
    elsif @result[:address]
      coords = Geocoder.search(@result[:address], :bounds => [[36.8, -122.75], [37.8, -121.75]]).first.geometry['location']
      @result[:lat], @result[:lng] = coords['lat'].to_f, coords['lng'].to_f
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

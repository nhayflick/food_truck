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


  private

    def set_truck
      @truck = Truck.find(params[:id])
    end

    def truck_params
      params.require(:truck).permit(:name, :location_id, :location_description, :address, :food_description, :lat, :lng, :hours_description)
    end
end
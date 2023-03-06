class Api::V1::CoffeeController < ApplicationController
  before_action :set_coffee, only: [:show, :destroy]

  def index
    @coffees = Coffee.all
    render json: { coffee: @coffees.as_json(only: [:id, :name, :coffee_shop], methods: [:image_url]) }
  end


  def show
    if @coffee.present?
      @reviews = @coffee.reviews
      render json: {
        coffee: @coffee.as_json(methods: [:image_url], only: [:id, :name, :description, :created_at, :updated_at]),
        reviews: @reviews
      }
    end
  end

  def create
    @coffee = Coffee.new(coffee_params)
    if @coffee.save
      render json: { coffee: @coffee }, status: :created
    else
      render json: { error: @coffee.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @coffee.destroy
    head :no_content
  end

  private

  def set_coffee
    @coffee = Coffee.find(params[:id])
  end

  def coffee_params
    params.permit(:name, :coffee_shop, :image)
  end
end

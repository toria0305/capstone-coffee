class Api::V1::ReviewController < ApplicationController
  before_action :set_review, only: [:show, :destroy]

  def index
    @reviews = @coffee.reviews
    render json: { reviews: @reviews }
  end

  def show
    render json: { review: @review }
  end

  def create
    
    
    @review = Review.new(review_params)
    coffee = Coffee.find_by_id(params["coffee_id"])
    @review.coffee = coffee
    @review.user = User.first
    if @review.save
      render json: { review: @review }, status: :created
    else
      render json: { error: @review.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    if @review.present?
      @review.destroy
    end
  end

  private


  def set_review
    @review = Review.find_by_id(params[:id])
  end

  def review_params
    params.require(:review).permit(:title, :comment, :rating)
  end
end

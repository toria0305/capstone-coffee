class Api::V1::AuthenticationController < ApplicationController
    def sign_up
        user = User.new(user_params)
        
        if user.save
          render json: { message: "User sign up successful" }
        else
          render json: { error: user.errors.full_messages }
        end
      rescue StandardError => e
        render json: { error: e.message }
    end
    def sign_in
        user = User.find_by(email: params[:email])   
        if user && user.valid_password?(params[:password])
          token = JWT.encode({ user_id: user.id, expires_at: Time.now + 30.minutes }, ENV['JWT_SECRET_KEY'], 'HS256')
          render json: { token: token, user_id: user.id }
        else
          render json: { error: 'Invalid credentials' }, status: :unauthorized
        end
    end

    private

    def user_params
      params.permit(:email, :password, :username, :first_name, :last_name)
    end
end
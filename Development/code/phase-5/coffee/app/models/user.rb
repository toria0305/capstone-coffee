class User < ApplicationRecord
  has_many :reviews, dependent: :destroy
  has_many :coffees, through: :reviews
  validates :username, :email, uniqueness: true
  validates :password, presence: :true
  devise :database_authenticatable
end

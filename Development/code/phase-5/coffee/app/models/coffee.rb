class Coffee < ApplicationRecord
  has_one_attached :image
  has_many :reviews, dependent: :destroy
  has_many :users, through: :reviews


  def image_url
    if image.attached?
      Rails.application.routes.url_helpers.rails_blob_path(image, only_path: true)
    end
  end
end

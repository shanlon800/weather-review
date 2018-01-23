class CreateReviews < ActiveRecord::Migration[5.1]
  def change
    create_table :reviews do |t|
      t.belongs_to :city, null: false
      t.belongs_to :user, null: false
      t.text :body
      t.integer :comfort_index, null: false
      t.integer :weather_variance, null: false

      t.timestamps
    end
  end
end

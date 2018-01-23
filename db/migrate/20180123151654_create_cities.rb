class CreateCities < ActiveRecord::Migration[5.1]
  def change
    create_table :cities do |t|
      t.belongs_to :user, null: false
      t.string :city_name, null: false
      t.string :state, null: false
      t.text :description

      t.timestamps null:false
    end
  end
end


#add image upload functionality

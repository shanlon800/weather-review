class AddBannerToCities < ActiveRecord::Migration[5.1]
  def change
    add_column :cities, :banner, :string
  end
end

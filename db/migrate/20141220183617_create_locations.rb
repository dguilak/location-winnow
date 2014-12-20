class CreateLocations < ActiveRecord::Migration
  def change
    create_table :locations do |t|
      t.string :city
      t.float :coords_lat
      t.float :coords_long
      t.string :country_code
      t.string :postal_code
      t.string :state
      t.string :street
      t.string :search_str

      t.timestamps null: false
    end
  end
end

class AddLocationRefToUser < ActiveRecord::Migration
  def change
    add_reference :users, :location, index: true
    add_foreign_key :users, :locations
  end
end

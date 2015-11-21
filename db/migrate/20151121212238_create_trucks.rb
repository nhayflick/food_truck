class CreateTrucks < ActiveRecord::Migration
  def change
    create_table :trucks do |t|
      t.string :name
      t.integer :location_id
      t.text :location_description
      t.string :address
      t.text :food_description
      t.decimal :lat, precision: 10, scale: 6
      t.decimal :lng, precision: 10, scale: 6
      t.text :hours_description

      t.timestamps null: false
    end
    add_index :trucks, :location_id, unique: true
  end
end

class CreateRuns < ActiveRecord::Migration[7.0]
  def change
    create_table :runs do |t|
      t.path :route
      t.datetime :start_timestamp
      t.datetime :end_timestamp
      t.integer :user_id
      t.integer :active_duration
      t.float :distance
      t.float :mean_speed
      t.text :nike_id

      t.timestamps
    end
  end
end

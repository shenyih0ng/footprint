# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
require 'json'
require 'date'

def consolidate_lat_lon (data_hash)
    coords = "["
    # puts data_hash["metrics"]
    for metric in data_hash["metrics"]
        if metric["type"] == "latitude"
            lat_values = metric["values"]
        elsif metric["type"] == "longitude"
            lon_values = metric["values"]
        end
    end
    
    total_entries = lon_values.length
    i = 0
    while i < total_entries
        coords += "(#{lon_values[i]["value"]}, #{lat_values[i]["value"]}), "
        i += 1
    end
    coords = coords[0...-2] + "]"

    # print coords
    # puts ""
    # # for checking correctness
    # puts ""
    # puts "Result:"
    # print correct
    # puts ""
    # puts "---------"
    # print i
    # puts ""
    # puts "Wrong"
    # print wrong
    return coords
end

def populate_data(file)
    puts file 
    file = File.read(file)
    data_hash = JSON.parse(file)
    if data_hash["type"] != "run"
        return
    end 
    # for summaries
    for summary in data_hash["summaries"]
        if summary["metric"] == "distance"
            distance = summary["value"]
        elsif summary["metric"] == "speed"
            speed = summary["value"]
        end
    end

    # for coords
    coords = consolidate_lat_lon(data_hash)

    start_timestamp = data_hash["start_epoch_ms"]
    start_timestamp = Time.at(0, start_timestamp, :millisecond).to_datetime
    end_timestamp = data_hash["end_epoch_ms"]
    end_timestamp = Time.at(0, end_timestamp, :millisecond).to_datetime

    Run.create!({
        route: coords, 
        start_timestamp: start_timestamp,
        end_timestamp: end_timestamp,
        user_id: 1,
        active_duration: data_hash["active_duration_ms"],
        distance: distance,
        mean_speed: speed,
        nike_id: data_hash["id"]
    })
    puts "Done"
end
problematic = ["data/yihongactivity-00df1fde-69a3-4035-9f2a-485900baf7b3.json",
"data/yihong/activity-1bc4af0b-4f30-44ca-bcb3-3ec753195efc.json",
"data/yihong/activity-27d1e791-0fbb-44ef-bd20-3c7f0e269bb9.json",
"data/yihong/activity-28a5dac6-c35a-471f-b552-f880723cc603.json",
"data/yihong/activity-31610c7d-57a1-421f-abab-cd6129f30490.json",
"data/yihong/activity-36093be9-01a3-4ac4-b615-1c2635f50bec.json",
"data/yihong/activity-5ab2d2f4-04f1-449c-bedb-cd27d703718a.json",
"data/yihong/activity-926b35a1-27d7-46ac-8c5c-2cb3b71a0448.json",
"data/yihong/activity-cea2d2a9-c598-48fe-934b-662cf3ba9092.json",
"data/yihong/activity-df026fad-f5b5-43c1-86b0-db7bf59e6c17.json",
"data/yihong/activity-ec5730f3-a0f5-4ac2-b4d4-8dc676ec52b8.json",
"data/yihong/activity-fe7521ca-10ed-4fbe-b66b-34a3a8b79790.json",
"data/yihong/activity-b05fa3be-1ac4-4867-938b-b22cbb1fbeba.json",
"data/yihong/activity-326683bb-2922-4479-879f-ebf7113e928c.json",
"data/yihong/activity-4ddabed0-d4f5-4ba3-b3e3-1d91e6a7910d.json",
"data/yihong/activity-538720b8-abe8-43f8-915e-6f67f8ec07de.json",
"data/yihong/activity-3796e618-2253-4281-90b7-9e9873f68c83.json",
"data/yihong/activity-eb055f2a-5720-4618-8eee-f24646be5a7b.json",
"data/yihong/activity-a4759056-48f1-430c-af84-61f77bfbb976.json",
"data/yihong/activity-acebcd9b-73a3-49f6-962e-0308a35baa8c.json",
"data/yihong/activity-1591dcba-3a42-4534-8430-fed1f8aaf76f.json",
"data/yihong/activity-00df1fde-69a3-4035-9f2a-485900baf7b3.json",
"data/yihong/activities-0.json",
"data/yihong/activities-1.json",
"data/yihong/activities-2.json",
"data/yihong/activities-3.json",
"data/yihong/activities-4.json",
"data/yihong/activities-5.json",
"data/yihong/activities-6.json",
"data/yihong/activities-7.json",
"data/yihong/activities-8.json"
]

file = Dir["data/yihong/*"][0]
file = File.read(file)
data_hash = JSON.parse(file)

puts "all done"
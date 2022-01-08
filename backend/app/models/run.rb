require "date"
class Run < ApplicationRecord
    scope :filter_min_dist, -> (distance) { where "distance > #{distance}"}
    scope :filter_max_dist, -> (distance) { where "distance < #{distance}"}
    scope :filter_started_before, -> (epoch) { where("start_timestamp < ?", Time.at(0, epoch, :millisecond).to_datetime)}
    scope :filter_started_after, -> (epoch) { where("start_timestamp > ?", Time.at(0, epoch, :millisecond).to_datetime)}
end


# 1.36, 103.81 +- 0.15 0.25
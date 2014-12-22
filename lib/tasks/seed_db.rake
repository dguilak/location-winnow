require 'json'

namespace :seed_db do
    desc "This task seeds the Locations table with info from location.json"
    task :seed_locations_from_location_json => :environment do
        # I renamed some fields in the DB, so this tracks those changes
        field_diff_map = {
            'to_search_s' => 'search_str',
            'street_1' => 'street'
        }

        # TODO: I know this can be cleaner in Ruby
        locations = JSON.parse(File.read("#{Rails.root}/app/assets/location.json"))
        locations.each do |location|
            # Made the 'coords' field two different float values instead of one list
            coords = location.extract!('coords')['coords']
            coords = { 'coords_lat' => coords[0], 'coords_long' => coords[1] }

            # If the key is in the map, we'll switch them out
            location.transform_keys!{ |key| field_diff_map.has_key?(key) ? field_diff_map[key] : key }
            location.merge!(coords) 

            Location.create!(location)
        end
    end

    desc "Just creates one test user for us to use"
    task :create_test_user => :environment do
        User.create!({ :name => "Jane", :email => "jane@jane.jane" })
    end
end

require 'json'

namespace :seed_db_with_locations do
    desc "This task seeds the Locations table with info from location.json"
    task :seed_db do
        locations = JSON.parse(File.read("#{Rails.root}/app/assets/location.json"))
        locations.each do |location|
            print location
        end
    end
end

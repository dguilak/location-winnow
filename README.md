Exercise to learn Ruby/RoR

# README

After push to Heroku, `heroku run rake seed_db:create_test_user` and `heroku run rake seed_db:seed_locations_from_location_json`

## Devlog

  * Starting with the official guide on the rails site: http://guides.rubyonrails.org/getting_started.html
  * Installed RVM and using this cheat sheet: http://cheat.errtheblog.com/s/rvm
    * Installing 2.1.5 — latest stable version, according to Google?
    * Installed Rails
  * `rails new location-winnow` to create template
  * While rails was running `bundle install` which was taking a while, started working on frontend:
    * Using CSS framework ‘Skeleton’ that I found on HN a few weeks ago and looked lightweight and cool: http://getskeleton.com
    * Modify template file
  * Generate new ‘Welcome’ controller with ‘index’ action
  * Add resource (locations)
    * Read about ActiveRecord to figure out how best to put the stuff from locations.json in the DB: http://guides.rubyonrails.org/active_record_basics.html
  * Created and ran migrations for Location, User
  * Create tasks to parse locations.json and add a sample User
  * Created migration to link Users and Location
  * Set up endpoint for pulling down all locations in JSON form
  * Got asset pipeline working for including the CSS from the Skeleton framework - http://guides.rubyonrails.org/layouts_and_rendering.html
  * Got endpoint for PATCHing User object for updating location working
  * Using rails-assets to get dependencies for Backbone, etc https://rails-assets.org/
  * Lots of issues with Asset pipeline — not getting the correct version of marionette?
  * Finally got it to work by manually including Marionette instead of using rails-assets version, jeez.
  * Decided to use an Autocomplete library https://github.com/devbridge/jQuery-Autocomplete
  * Building out Marionette views, User syncs location successfully
  * Filtering, looked a bit at http://backbonefu.com/2011/08/filtering-a-collection-in-backbone-js/, didn’t realize there was a keyup event so easily accessible
  * Automatic filter was successful, made it pretty clean, now trying to go back through and format things to look a little nicer
  * Want to get rails app on Heroku
  * Had to switch to postgresql db because Heroku doesn’t support sqlite3
  * Asset pipeline not working on Heroku
  * Fixed with http://natashatherobot.com/rails-4-heroku-assets-not-found-css-image/

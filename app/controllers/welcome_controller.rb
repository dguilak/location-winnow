class WelcomeController < ApplicationController
  def index
      # Obviously, wouldn't ever do this in production.
      # Assumes you've already run the set_db:create_test_user rake task
      @user = User.find(1)
      if @user.location_id
          @location = Location.find(@user.location_id).to_json.html_safe
      end
  end
end

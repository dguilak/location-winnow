class WelcomeController < ApplicationController
  def index
      # Obviously, wouldn't ever do this in production.
      # Assumes you've already run the set_db:create_test_user rake task
      @user = User.find(1)
  end
end

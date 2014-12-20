class LocationsController < ApplicationController
    def index
        @locations = Location.all
        render json: @locations
    end

    def create
        render status: :not_implemented
    end

    def new
        render status: :not_implemented
    end

    def edit
        render status: :not_implemented
    end

    def show
        render status: :not_implemented
    end

    def update
        render status: :not_implemented
    end

    def destroy
        render status: :not_implemented
    end
end

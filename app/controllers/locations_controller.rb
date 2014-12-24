class LocationsController < ApplicationController
    def index
        if params[:query]
            @locations = Location.where("search_str ilike '%#{params[:query]}%'").limit(10)
        else
            @locations = Location.all
        end

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

class UsersController < ApplicationController
    def index
        render status: :not_implemented
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
        render :json => User.find(params[:id])
    end

    def update
        user = User.find(params[:id])
        user.update_attributes(user_params)
        render :json => user
    end

    def destroy
        render status: :not_implemented
    end

    private
        def user_params
            params.require(:user).permit(:location_id)
        end
end

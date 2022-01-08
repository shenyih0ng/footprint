module Api
    module V1
        class RunsController < ApplicationController
            
            def index 
                user_id = params[:user_id]
                # for demo purposes, reduce rendering
                if params[:limit].present?
                    runs = Run.first(params[:limit])
                    render json: {status:'SUCCESS', message:'Loaded Runs', data:runs}, status: :ok
                    return
                end
                @runs = Run.where(nil)
                # @runs = @runs.filter_distance_gt(params[:min_dist]) if params[:min_dist].present?
                filtering_params(params).each do |key, value|
                    @runs = @runs.public_send("filter_#{key}", value) if value.present?
                end
                puts "yeetusstsuss"
                @runs = @runs.as_json
                for run in @runs
                    temp_str = run["route"]
                    temp_str = temp_str.gsub('(', '[')
                    temp_str = temp_str.gsub(')', ']')
                    run["route"] = eval(temp_str)
                    puts run["route"].class
                end
                render json: {status:'SUCCESS', message:'Loaded Runs', data:@runs}, status: :ok
            end

            def show
                run = Run.find(params[:id])
                render json: {status:'SUCCESS', message:'Loaded Runs', data:run}, status: :ok
            end

            private 

            def filtering_params(params)
                params.slice(:max_dist, :min_dist, :started_before, 
                    :started_after)
                end 
        end
    end
end


def index
    @products = Product.where(nil)
    filtering_params(params).each do |key, value|
      @products = @products.public_send("filter_#{key}", value) if value.present?
    end
  end
  
  private
  
  # A list of the param names that can be used for filtering the Product list
  def filtering_params(params)
    params.slice(:min_dist, :max_dist)
  end
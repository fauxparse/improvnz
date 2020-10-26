class NodesController < ApplicationController
  def show
    @node = params[:id] ? Node.find(params[:id]) : Node.first

    respond_to do |format|
      format.json { render json: @node.as_json }
      format.html
    end
  end

  def update
    @node = Node.first
    @node.update!(node_params)

    render json: @node.as_json
  end

  private

  def node_params
    params
      .require(:node)
      .permit(
        :name,
        content: {}
      )
  end
end

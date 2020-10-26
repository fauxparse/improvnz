class AddNameToNodes < ActiveRecord::Migration[6.0]
  def change
    add_column :nodes, :name, :string
  end
end

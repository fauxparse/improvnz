class SetDefaultNodeContent < ActiveRecord::Migration[6.0]
  def up
    execute <<~SQL
      ALTER TABLE nodes ALTER COLUMN content SET DEFAULT '{ "blocks": [], "entityMap": [] }'::jsonb;
    SQL
  end

  def down
    execute <<~SQL
      ALTER TABLE nodes ALTER COLUMN content DROP DEFAULT;
    SQL
  end
end

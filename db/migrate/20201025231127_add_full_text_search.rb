class AddFullTextSearch < ActiveRecord::Migration[6.0]
  def up
    execute <<~SQL
      CREATE OR REPLACE FUNCTION extract_raw_text(jsonb)
      RETURNS text
      AS
      $$
      DECLARE
        result text;
      BEGIN
        SELECT INTO result string_agg(block->'text'#>>'{}', E'\n') AS text FROM jsonb_array_elements($1->'blocks') block;
        RETURN result;
      END;
      $$
      LANGUAGE plpgsql IMMUTABLE
      RETURNS NULL ON NULL INPUT;

      ALTER TABLE nodes
      ADD COLUMN searchable tsvector GENERATED ALWAYS AS (
        setweight(to_tsvector('english', coalesce(name, '')), 'A') ||
        setweight(to_tsvector('english', coalesce(extract_raw_text(content),'')), 'B')
      ) STORED;
    SQL

    add_index :nodes, :searchable, using: :gin
  end

  def down
    remove_column :nodes, :searchable

    execute <<~SQL
      DROP FUNCTION extract_raw_text(jsonb);
    SQL
  end
end

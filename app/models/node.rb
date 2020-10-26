class Node < ApplicationRecord
  include PgSearch::Model
  pg_search_scope(
    :search,
    against: { title: 'A', description: 'B' },
    using: {
      tsearch: {
        dictionary: 'english', tsvector_column: 'searchable'
      },
    }
  )

  def empty?
    content.blank? || content['blocks'].empty?
  end
end

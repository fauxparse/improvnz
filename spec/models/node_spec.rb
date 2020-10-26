require 'rails_helper'

RSpec.describe Node, type: :model do
  subject(:node) { FactoryBot.create(:node) }

  it { is_expected.to be_valid }

  it { is_expected.to be_empty }

  describe '.search' do
    let(:moby_dick) { FactoryBot.create(:moby_dick) }

    context 'for ‘interesting’' do
      subject(:results) { Node.search('interesting') }

      it 'matches ‘interest’' do
        expect(results).to include(moby_dick)
      end
    end

    context 'for ‘xyzzy’' do
      subject(:results) { Node.search('xyzzy') }

      it 'returns no matches' do
        expect(results).to be_empty
      end
    end
  end
end

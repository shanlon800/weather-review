import VoteTile from '../../../app/javascript/components/VoteTile';

describe('VoteTile', () => {
  let currentUser,
  reviewId,
  wrapper;

  beforeEach(() => {
    jasmineEnzyme();
    wrapper = mount(
      <VoteTile
        currentUser={1}
        reviewId={1}
      />
    );
  })

  it('should render a span with the class name of "votes" as well as upvote and downvote spans', () => {
    expect(wrapper.find('span.votes')).toBePresent();
    expect(wrapper.find('span.upvote')).toBePresent();
    expect(wrapper.find('span.downvote')).toBePresent();
  });

  it('should render i tags, one each for upvote and downvote', () => {
    expect(wrapper.find('i.fa-chevron-up')).toBePresent();
    expect(wrapper.find('i.fa-chevron-down')).toBePresent();
  });

  it('should render a total amount of votes, with no data, set to 0', () => {
    expect(wrapper.find('#total').text()).toEqual('0');
  });
});

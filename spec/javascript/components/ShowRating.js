import ShowRating from '../../../app/javascript/components/ShowRating';

describe('ShowRating', () => {
  let type,
  value,
  wrapper;

  beforeEach(() => {
    jasmineEnzyme();
    wrapper = mount(
      <ShowRating
        type="comfort"
        value={3}
      />
    );
  });

  it('should render the first three i tags with incrementing .rc-x classes, and the last two should just have the icon-o class', () => {
    expect(wrapper.find('i.fa-star.rc-1')).toBePresent();
    expect(wrapper.find('i.fa-star.rc-2')).toBePresent();
    expect(wrapper.find('i.fa-star.rc-3')).toBePresent();
  });

  it('should not render the 4th or 5th .rc-x classed i tag', () => {
    expect(wrapper.find('i.fa-star.rc-4')).not.toBePresent();
    expect(wrapper.find('i.fa-star.rc-5')).not.toBePresent();
  });
});

import ReviewShowTile from '../../../app/javascript/components/ReviewShowTile'

describe('ReviewShowTile', () => {
  let id,
  body,
  comfort_index,
  weather_variance,
  wrapper;

  beforeEach(() => {
    jasmineEnzyme();
    wrapper = mount(
      <ReviewShowTile
        id={2}
        body="New York is a great city to live in"
        comfort_index={5}
        weather_variance={2}
      />
    );
  });



  it('should render an h5 tag with the review body', () => {
    expect(wrapper.find('h5').text()).toBe("New York is a great city to live in");
  });

  it('should render a p tag with and id of comfort-index-2', () => {
    expect(wrapper.find('p#comfort-index-2')).toBePresent();
  });

  it('should render a p tag with and id of variance-index-2', () => {
    expect(wrapper.find('p#variance-index-2')).toBePresent();
  });

  it('should render icons, one with a class of "rc-5"', () => {
    expect(wrapper.find('i.rc-5')).toBePresent();
  });

  it('should render icons, one with a class of "rv-2" as well as at least one empty square.', () => {
    expect(wrapper.find('i.rv-2')).toBePresent();
    expect(wrapper.find('i.fa-square-o')).toBePresent();
  });
});

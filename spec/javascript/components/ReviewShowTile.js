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
        comfort_index="5"
        weather_variance="2"
      />
    );
  });



  it('should render an h5 tag with the review body', () => {
    expect(wrapper.find('h5').text()).toBe("New York is a great city to live in");
  });

  it('should render a p tag with and id of comfort-index-2', () => {
    expect(wrapper.find('#comfort-index-2')).toBePresent();
  });

  it('should render a p tag with and id of variance-index-2', () => {
    expect(wrapper.find('#variance-index-2')).toBePresent();
  });

  it('should render icons, one with a class of "comfort-5"', () => {
    expect(wrapper.find('.comfort-5')).toBePresent();
  });

  it('should render icons, one with a class of "variance-2"', () => {
    expect(wrapper.find('.variance-2')).toBePresent();
    expect(wrapper.find('.fa-square-o')).toBePresent();
  });
});

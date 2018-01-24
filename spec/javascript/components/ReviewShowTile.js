import ReviewShowTile from '../../../app/javascript/components/ReviewShowTile'

describe('ReviewShowTile', () => {
  let body,
  comfort_index,
  weather_variance,
  wrapper;

  beforeEach(() => {
    jasmineEnzyme();
    wrapper = mount(
      <ReviewShowTile
        body="New York is a great city to live in"
        comfort_index="5"
        weather_variance="2"
      />
    );
  });

  it('should render an h3 tag', () => {
    expect(wrapper.find('h3')).toBePresent();
  });
  it('should render an h3 tag with Reviews:', () => {
    expect(wrapper.find('h3').text()).toBe("Reviews:");
  });

  it('should render an h5 tag with the review body', () => {
    expect(wrapper.find('h5').text()).toBe("New York is a great city to live in");
  });

  it('should render an h7 tag', () => {
    expect(wrapper.find('h7')).toBePresent();
  });
  it('should render an h7 tag with the comfort index', () => {
    expect(wrapper.find('h7').text()).toBe("Comfort Index: 5");
  });

  it('should render a p tag', () => {
    expect(wrapper.find('h7')).toBePresent();
  });
  it('should render a p tag with the comfort index', () => {
    expect(wrapper.find('p').text()).toBe("Weather Variance: 2");
  });

});

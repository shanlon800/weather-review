import CityTile from '../../../app/javascript/components/CityTile'

describe('CityTile', () => {
  let city_name,
  state,
  description,
  wrapper;

  beforeEach(() => {
    jasmineEnzyme();
    wrapper = mount(
      <CityTile
        id={1}
        key={1}
        city_name="Brahston"
        state="WA"
        description="WA BRAH"
      />
    );
  });

  it('should render an h3 tag', () => {
    expect(wrapper.find('h3')).toBePresent();
  });

  it('should render an h3 tag with the city_name and state property', () => {
    expect(wrapper.find('h3').text()).toBe('Brahston WA')
  })

  it('should render an li tag', () => {
    expect(wrapper.find('li')).toBePresent();
  });

  it('should render an li tag with the description property', () => {
    expect(wrapper.find('li').text()).toBe('WA BRAH')
  });

});

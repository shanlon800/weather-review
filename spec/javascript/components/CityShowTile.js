import CityShowTile from '../../../app/javascript/components/CityShowTile'

describe('CityShowTile', () => {
  let city_name,
  state,
  description,
  currentUserId,
  cityCreator,
  wrapper,
  wrapper2;

  beforeEach(() => {
    jasmineEnzyme();
    wrapper = mount(
      <CityShowTile
        city_name="New York"
        state="NY"
        description="Concrete Jungle where dreams are made of"
        currentUserId={8}
        cityCreator={8}
        averageComfort={2}
        averageVariance={4}
      />
    );
  });

  it('should render an h1 tag', () => {
    expect(wrapper.find('h1')).toBePresent();
  });
  it('should render an h1 tag with city name and state property', () => {
    expect(wrapper.find('h1').text()).toBe("New York NY");
  });

  it('should render a div with a show-description id with the description text', () => {
    expect(wrapper.find('#show-description')).toHaveText("Concrete Jungle where dreams are made of");
  });


  it('should render an h7 tag', () => {
    expect(wrapper.find('h7')).toBePresent();
  });

  it('should render a div with an id of comfort-average with the comfort average text', () => {
    expect(wrapper.find('#comfort-average').text()).toBe("Average Comfort Index: 2");
  });

  it('should render a div with an id of variance-average with the comfort average text', () => {
    expect(wrapper.find('#variance-average').text()).toBe("Average Weather Variance: 4");
  });

  it('should render an edit button if the current user is the user who added th city', () => {
    expect(wrapper.find('a')).toHaveText('Edit');
  });

  it('should not render the edit button if the current user did not add the city', ()=> {
    wrapper2 = mount(
      <CityShowTile
        currentUserId={6}
        cityCreator={8}
      />);
    expect(wrapper2.find('a').exists()).toEqual(false);
  });

});

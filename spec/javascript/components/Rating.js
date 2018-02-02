import Rating from '../../../app/javascript/components/Rating'


describe('Rating', () => {
  let label,
  content,
  name,
  rateType,
  value,
  handlerFunction,
  wrapper;

  beforeEach(() => {
    jasmineEnzyme();
    wrapper = mount(
      <Rating
        content={3}
        label="Variance Index"
        name="reviewVariance"
        rateType="variance"
        value={3}
        handlerFunction={3}
      />
    );
  });

  it('should render a label', () => {
    expect(wrapper.find('label')).toBePresent();
  })

  it('should render a Variance Index label', () => {
    expect(wrapper.find('label').text()).toBe('Variance Index');
  })

  it('should render i tags', () => {
    expect(wrapper.find('i')).toBePresent();
  })

  it ('renders a button tag with an onClick method', () => {
   expect(wrapper.find('i').first().props()).toEqual(jasmine.objectContaining({
     onClick: jasmine.any(Function)
   }))
 })

})

describe('Rating', () => {
  let label,
  content,
  name,
  rateType,
  value,
  handlerFunction,
  wrapper;

  beforeEach(() => {
    jasmineEnzyme();
    wrapper = mount(
      <Rating
        content={2}
        label="Comfort Index"
        name="comfortVariance"
        rateType="variance"
        value={2}
        handlerFunction={2}
      />
    );
  });

  it('should render a label', () => {
    expect(wrapper.find('label')).toBePresent();
  })

  it('should render a Variance Index label', () => {
    expect(wrapper.find('label').text()).toBe('Comfort Index');
  })

  it('should render i tags', () => {
    expect(wrapper.find('i')).toBePresent();
  })

  it ('renders a button tag with an onClick method', () => {
   expect(wrapper.find('i').first().props()).toEqual(jasmine.objectContaining({
     onClick: jasmine.any(Function)
   }))
 })

})

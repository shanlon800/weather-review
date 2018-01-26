import BodyField from '../../../app/javascript/components/BodyField'

describe('BodyField', () => {
  let name,
  label,
  value,
  type,
  wrapper;

  beforeEach(() => {
    jasmineEnzyme();
    wrapper = mount(
      <BodyField
        label="Review"
        name="reviewBody"
        value="This is a great city."
        type="text"
      />
    )
  })

  it('should render a label', () => {
    expect(wrapper.find('label')).toBePresent();
  })

  it('should render a label of Review', () => {
    expect(wrapper.find('label').text()).toBe('Review');
  })

  it('should render a text area', () => {
    expect(wrapper.find('textarea')).toBePresent();
  })

})

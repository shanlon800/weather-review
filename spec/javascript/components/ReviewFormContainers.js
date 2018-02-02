import ReviewFormContainer from '../../../app/javascript/containers/ReviewFormContainer'


describe('ReviewFormContainer', () => {

  let wrapper,
  clearFn;

  beforeEach(() => {
    jasmineEnzyme();
    clearFn = jasmine.createSpy('onClick spy');
    wrapper = mount(
      <ReviewFormContainer
        clearFn={clearFn}
      />
    );
  });

  it ('renders a button tag with an onClick method', () => {
    expect(wrapper.find('button')).toBePresent();
    wrapper.find('button').simulate('click');
    expect(clearFn).toHaveBeenCalled();
 })
})

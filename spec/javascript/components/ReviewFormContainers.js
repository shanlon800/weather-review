import ReviewFormContainer from '../../../app/javascript/containers/ReviewFormContainer'


describe('ReviewFormContainer', () => {

  let wrapper;

  beforeEach(() => {
    jasmineEnzyme();
    wrapper = mount(
      <ReviewFormContainer
      />
    );
  });

  it ('renders a button tag with an onClick method', () => {
   expect(wrapper.find('button').props()).toEqual(jasmine.objectContaining({
     onClick: jasmine.any(Function)
   }))
 })
})

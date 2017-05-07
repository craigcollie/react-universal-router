import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Route from './Route';

describe('Component: Route', () => {
  it('should render the component prop and pass all other props to it', () => {
    const Test = () => (<div>BLAH</div>);
    const testProps = {
      foo: 'bar',
    };

    const wrapper = shallow(
      <Route path="/foo" {...testProps} component={Test} />,
    );

    const componentProps = wrapper.find(Test).props();
    expect(componentProps.foo).to.equal(testProps.foo);
    expect(componentProps.path).to.equal('/foo');
  });
});

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import Link from './Link';

describe('Component: Link', () => {
  it('should ensure text and href are rendered', () => {
    const wrapper = shallow(<Link to="/foo" text="blah" />);
    expect(wrapper.props().href).to.equal('/foo');
    expect(wrapper.text()).to.equal('blah');
  });

  it('should wrap any child elements', () => {
    const wrapper = shallow(
      <Link to="/foo" text="blah">
        <span>BLAH</span>
      </Link>,
    );
    expect(wrapper.text()).to.equal('BLAH');
  });

  it('should handle click events', () => {
    const onRouteChangeSpy = sinon.spy();
    const preventDefaultSpy = sinon.spy();

    const wrapper = shallow(
      <Link to="/foo" text="blah" />, {
        context: {
          onRouteChange: onRouteChangeSpy,
        },
      },
    );

    wrapper.simulate('click', { preventDefault: preventDefaultSpy });
    expect(preventDefaultSpy.called).to.equal(true);
    expect(onRouteChangeSpy.getCall(0).args[0]).to.equal('/foo');
  });
});

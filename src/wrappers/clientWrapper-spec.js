import React from 'react';
import { expect } from 'chai';

import clientWrapper from './clientWrapper';

describe('Wrappers: clientWrapper', () => {
  it('should ensure all server props are injected when component is mounted', () => {
    const serverProps = { foo: '123' };
    const appPropsEl = document.getElementById('app-props');
    appPropsEl.innerHTML = JSON.stringify(serverProps);

    const App = () => (<div />);

    const config = {
      entry: {
        rootComponent: App,
      },
    };
    const rootComponent = clientWrapper(config);
    expect(rootComponent.props.foo).to.eql('123');
  });
});

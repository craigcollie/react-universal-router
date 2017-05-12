import React from 'react';
import { expect } from 'chai';

import Route from './../components/Route/Route';
import clientWrapper from './clientWrapper';

describe('Wrappers: clientWrapper', () => {
  it('should ensure all server props are injected when component is mounted', () => {
    const serverProps = { foo: '123' };
    const appPropsEl = document.getElementById('app-props');
    appPropsEl.innerHTML = JSON.stringify(serverProps);

    const App = () => (<div />);
    const Routes = () => (
      <Route path="/foo" />
    );

    const rootComponent = clientWrapper(App, Routes);
    expect(rootComponent.props.foo).to.eql('123');
  });
});

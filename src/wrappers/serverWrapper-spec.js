import React from 'react';
import { expect } from 'chai';

import Route from './../components/Route/Route';
import serverWrapper from './serverWrapper';

function extractProps(str) {
  return JSON.parse(str.match(/<!\[CDATA\[(.*?)\]\]/)[1]);
}

describe('Wrappers: serverWrapper', () => {
  it('should ensure all props are stringified into the app-root element', () => {
    const App = () => (<div />);
    const Routes = () => (
      <Route path="/foo" />
    );
    const props = {
      location: {
        pathname: '/foo',
      },
      foo: 'bar',
    };

    const rootComponent = serverWrapper(App, Routes, props);
    const { location, foo } = extractProps(rootComponent);

    expect(location.pathname).to.equal('/foo');
    expect(foo).to.equal('bar');
  });
});

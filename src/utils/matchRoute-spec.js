import React from 'react';
import { expect } from 'chai';

import matchRoute from './matchRoute';
import { Route } from './../components/Route';

describe('matchRoute', () => {
  it('should match the correct child route when only 1 route', () => {
    const routes = () => (
      <div>
        <Route path="/foo" />
      </div>
    );
    const result = matchRoute(routes, '/foo');
    expect(result.props.path).to.equal('/foo');
  });

  it('should match the correct child route when more than 1 route', () => {
    const routes = () => (
      <div>
        <Route path="/foo" />
        <Route path="/bar" />
      </div>
    );
    const result = matchRoute(routes, '/foo');
    expect(result.length).to.equal(1);
    expect(result[0].props.path).to.equal('/foo');
  });
});

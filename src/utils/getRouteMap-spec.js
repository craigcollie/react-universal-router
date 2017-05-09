import React from 'react';
import { expect } from 'chai';

import Route from './../components/Route/Route';
import getRouteMap from './getRouteMap';

const TestComponent = () => (<div />);

describe('Utils: createRouteMapping', () => {
  const tests = [
    {
      routes: () => (
        <div>
          <Route path="/" component={TestComponent} />
          <Route path="/foo/:id" component={TestComponent} />
          <Route path="/foo/:bar/:id" component={TestComponent} />
        </div>
      ),
      result: {
        '/': {
          component: TestComponent,
          meta: undefined,
          path: '/',
          resolve: undefined,
        },
        '/foo/:id': {
          component: TestComponent,
          meta: undefined,
          path: '/foo/:id',
          resolve: undefined,
        },
        '/foo/:bar/:id': {
          component: TestComponent,
          meta: undefined,
          path: '/foo/:bar/:id',
          resolve: undefined,
        },
      },
    },
    {
      routes: () => (
        <Route path="/foo/blah" component={TestComponent} />
      ),
      result: {
        '/foo/blah': {
          component: TestComponent,
          meta: undefined,
          path: '/foo/blah',
          resolve: undefined,
        },
      },
    },
  ];

  tests.forEach(({
    routes,
    result,
  }) => {
    const routeNodes = routes().props.children;
    const routeNodeCount = Array.isArray(routeNodes) ? routeNodes.length : 1;
    it(`it should ensure route(s) count: ${routeNodeCount} have the correct mapping`, () => {
      expect(getRouteMap(routes)).to.eql(result);
    });
  });
});

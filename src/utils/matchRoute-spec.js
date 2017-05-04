import React from 'react';
import { expect } from 'chai';

import matchRoute from './matchRoute';
import Route from './../components/Route';

const Test = () => (<div></div>);

describe('matchRoute', () => {
  describe('single route', () => {
    const Routes = () => (
      <Route path="/foo/:id" component={Test} />
    );

    const tests = [
      {
        path: '/foo/1',
        result: { path: '/foo/:id', component: Test }
      },
    ];

    tests.forEach(({ path, result }) => {
      it(`should match ${path} to ${result.path}`, () => {
        expect(matchRoute(Routes, path)).to.eql(result);
      });
    });
  });

  describe('multiple routes', () => {
    const Routes = () => (
      <div>
        <Route path="/" component={Test} />
        <Route path="/foo/:id" component={Test} />
        <Route path="/foo/:bar/:id" component={Test} />
      </div>
    );

    const tests = [
      {
        path: '/',
        result: { path: '/', component: Test },
      },
      {
        path: '/foo/1',
        result: { path: '/foo/:id', component: Test },
      },
      {
        path: '/no-route',
        result: {},
      },
      {
        path: '/foo/somewhere/else',
        result: { path: '/foo/:bar/:id', component: Test },
      },
    ];

    tests.forEach(({ path, result }) => {
      it(`should match ${path} to ${result.path}`, () => {
        expect(matchRoute(Routes, path)).to.eql(result);
      });
    });
  });
});

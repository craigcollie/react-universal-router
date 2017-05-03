import React from 'react';
import { expect } from 'chai';

import matchRoute from './matchRoute';
import Route from './../components/Route';

describe('matchRoute', () => {
  describe('single route', () => {
    const Routes = () => (
      <Route path="/foo/:id" />
    );

    const tests = [
      {
        path: '/foo/1',
        result: { path: '/foo/:id' }
      },
    ];

    tests.forEach(({ path, result }) => {
      it(`should match ${path} to ${result.path}`, () => {
        expect(matchRoute(Routes().props.children, path)).to.eql(result);
      });
    });
  });

  describe('multiple routes', () => {
    const Routes = () => (
      <div>
        <Route path="/" />
        <Route path="/foo/:id" />
        <Route path="/foo/:bar/:id" />
      </div>
    );

    const tests = [
      {
        path: '/',
        result: { path: '/' },
      },
      {
        path: '/foo/1',
        result: { path: '/foo/:id' },
      },
      {
        path: '/no-route',
        result: {},
      },
      {
        path: '/foo/somewhere/else',
        result: { path: '/foo/:bar/:id' },
      },
    ];

    tests.forEach(({ path, result }) => {
      it(`should match ${path} to ${result.path}`, () => {
        expect(matchRoute(Routes().props.children, path)).to.eql(result);
      });
    });
  });
});

import { expect } from 'chai';

import getParamsFromUrl from './getParamsFromUrl';

describe('getParamsFromUrl', () => {
  const tests = [
    {
      userDefinedRoute: '/foo',
      locationString: '/foo',
      result: {},
    },
    {
      userDefinedRoute: '/foo/:id',
      locationString: '/foo/123',
      result: { id: '123' }
    },
    {
      userDefinedRoute: '/blah/:foo/:id/:path',
      locationString: '/blah/a/b/c',
      result: { foo: 'a', id: 'b', path: 'c' }
    }
  ];

  tests.forEach(({ userDefinedRoute, locationString, result }) => {
    it(`should get all params from ${userDefinedRoute}`, () => {
      expect(getParamsFromUrl(userDefinedRoute, locationString)).to.eql(result);
    });
  });
});

import { expect } from 'chai';

import parseUrl from './parseUrl';

describe('parseUrl', () => {
  const tests = [
    {
      location: '/foo/blah',
      result: { pathname: '/foo/blah', search: undefined }
    },
    {
      location: '/foo/blah?a=b&c=d',
      result: { pathname: '/foo/blah', search: 'a=b&c=d' }
    }
  ];

  tests.forEach(({ location, result }) => {
    it(`should get the pathname and search from ${location}`, () => {
      expect(parseUrl(location)).to.eql(result);
    });
  });
});

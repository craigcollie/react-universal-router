import { expect } from 'chai';
import sinon from 'sinon';

import resolveRoutePlugin from './resolveRoutePlugin';

describe('Plugins: resolveRoutePlugin', () => {
  it('should resolve the route', (done) => {
    const location = '/foo&param=foo';
    const route = {
      resolve: () => Promise.resolve({ data: 'resolved' }),
      routeParams: {},
      resolvedData: null,
      cache: false,
    };
    const callbackSpy = sinon.spy();

    resolveRoutePlugin(location, route, false, callbackSpy)
      .then(() => {
        done();
        expect(callbackSpy.getCall(0).args[0].pathname).to.equal('/foo&param=foo');
        expect(callbackSpy.getCall(0).args[1]).to.eql({ data: 'resolved' });
      });
  });

  it('should not resolve any new data when cache is TRUE', (done) => {
    const location = '/foo&param=foo';
    const route = {
      resolve: () => Promise.resolve({ data: 'new data' }),
      routeParams: {},
      resolvedData: { data: 'original data' },
      cache: true,
    };
    const callbackSpy = sinon.spy();

    resolveRoutePlugin(location, route, false, callbackSpy);
    done();
    expect(callbackSpy.getCall(0).args[0].pathname).to.equal('/foo&param=foo');
    expect(callbackSpy.getCall(0).args[1]).to.equal(undefined);

  });
});

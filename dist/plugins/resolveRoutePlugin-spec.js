'use strict';

var _chai = require('chai');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _resolveRoutePlugin = require('./resolveRoutePlugin');

var _resolveRoutePlugin2 = _interopRequireDefault(_resolveRoutePlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Plugins: resolveRoutePlugin', function () {
  it('should resolve the route', function (done) {
    var location = '/foo&param=foo';
    var route = {
      resolve: function resolve() {
        return Promise.resolve({ data: 'resolved' });
      },
      routeParams: {},
      resolvedData: null,
      cache: false
    };
    var callbackSpy = _sinon2.default.spy();

    (0, _resolveRoutePlugin2.default)(location, route, false, callbackSpy).then(function () {
      done();
      (0, _chai.expect)(callbackSpy.getCall(0).args[0].pathname).to.equal('/foo&param=foo');
      (0, _chai.expect)(callbackSpy.getCall(0).args[1]).to.eql({ data: 'resolved' });
    });
  });

  it('should not resolve any new data when cache is TRUE', function (done) {
    var location = '/foo&param=foo';
    var route = {
      resolve: function resolve() {
        return Promise.resolve({ data: 'new data' });
      },
      routeParams: {},
      resolvedData: { data: 'original data' },
      cache: true
    };
    var callbackSpy = _sinon2.default.spy();

    (0, _resolveRoutePlugin2.default)(location, route, false, callbackSpy);
    done();
    (0, _chai.expect)(callbackSpy.getCall(0).args[0].pathname).to.equal('/foo&param=foo');
    (0, _chai.expect)(callbackSpy.getCall(0).args[1]).to.equal(undefined);
  });
});
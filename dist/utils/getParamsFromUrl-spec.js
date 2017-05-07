'use strict';

var _chai = require('chai');

var _getParamsFromUrl = require('./getParamsFromUrl');

var _getParamsFromUrl2 = _interopRequireDefault(_getParamsFromUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Utils: getParamsFromUrl', function () {
  var tests = [{
    userDefinedRoute: '/foo',
    locationString: '/foo',
    result: {}
  }, {
    userDefinedRoute: '/foo/:id',
    locationString: '/foo/123',
    result: { id: '123' }
  }, {
    userDefinedRoute: '/blah/:foo/:id/:path',
    locationString: '/blah/a/b/c',
    result: { foo: 'a', id: 'b', path: 'c' }
  }];

  tests.forEach(function (_ref) {
    var userDefinedRoute = _ref.userDefinedRoute,
        locationString = _ref.locationString,
        result = _ref.result;

    it('should get all params from ' + userDefinedRoute, function () {
      (0, _chai.expect)((0, _getParamsFromUrl2.default)(userDefinedRoute, locationString)).to.eql(result);
    });
  });
});
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _chai = require('chai');

var _matchRoute = require('./matchRoute');

var _matchRoute2 = _interopRequireDefault(_matchRoute);

var _Route = require('./../components/Route');

var _Route2 = _interopRequireDefault(_Route);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Test = function Test() {
  return _react2.default.createElement('div', null);
};

describe('Utils: matchRoute', function () {
  describe('single route', function () {
    var Routes = function Routes() {
      return _react2.default.createElement(_Route2.default, { path: '/foo/:id', component: Test });
    };

    var tests = [{
      path: '/foo/1',
      result: { path: '/foo/:id', component: Test }
    }];

    tests.forEach(function (_ref) {
      var path = _ref.path,
          result = _ref.result;

      it('should match ' + path + ' to ' + result.path, function () {
        (0, _chai.expect)((0, _matchRoute2.default)(Routes, path)).to.eql(result);
      });
    });
  });

  describe('multiple routes', function () {
    var Routes = function Routes() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_Route2.default, { path: '/', component: Test }),
        _react2.default.createElement(_Route2.default, { path: '/foo/:id', component: Test }),
        _react2.default.createElement(_Route2.default, { path: '/foo/:bar/:id', component: Test })
      );
    };

    var tests = [{
      path: '/',
      result: { path: '/', component: Test }
    }, {
      path: '/foo/1',
      result: { path: '/foo/:id', component: Test }
    }, {
      path: '/no-route',
      result: {}
    }, {
      path: '/foo/somewhere/else',
      result: { path: '/foo/:bar/:id', component: Test }
    }];

    tests.forEach(function (_ref2) {
      var path = _ref2.path,
          result = _ref2.result;

      it('should match ' + path + ' to ' + result.path, function () {
        (0, _chai.expect)((0, _matchRoute2.default)(Routes, path)).to.eql(result);
      });
    });
  });
});
//# sourceMappingURL=matchRoute-spec.js.map
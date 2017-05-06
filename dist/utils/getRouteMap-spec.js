'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _chai = require('chai');

var _Route = require('./../components/Route');

var _Route2 = _interopRequireDefault(_Route);

var _getRouteMap = require('./getRouteMap');

var _getRouteMap2 = _interopRequireDefault(_getRouteMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TestComponent = function TestComponent() {
  return _react2.default.createElement('div', null);
};

describe('Utils: createRouteMapping', function () {
  var tests = [{
    routes: function routes() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_Route2.default, { path: '/', component: TestComponent }),
        _react2.default.createElement(_Route2.default, { path: '/foo/:id', component: TestComponent }),
        _react2.default.createElement(_Route2.default, { path: '/foo/:bar/:id', component: TestComponent })
      );
    },
    result: {
      root: {
        component: TestComponent,
        meta: undefined,
        path: '/',
        resolve: undefined
      },
      '/foo/:id': {
        component: TestComponent,
        meta: undefined,
        path: '/foo/:id',
        resolve: undefined
      },
      '/foo/:bar/:id': {
        component: TestComponent,
        meta: undefined,
        path: '/foo/:bar/:id',
        resolve: undefined
      }
    }
  }, {
    routes: function routes() {
      return _react2.default.createElement(_Route2.default, { path: '/foo/blah', component: TestComponent });
    },
    result: {
      '/foo/blah': {
        component: TestComponent,
        meta: undefined,
        path: '/foo/blah',
        resolve: undefined
      }
    }
  }];

  tests.forEach(function (_ref) {
    var routes = _ref.routes,
        result = _ref.result;

    var routeNodes = routes().props.children;
    var routeNodeCount = Array.isArray(routeNodes) ? routeNodes.length : 1;
    it('it should ensure route(s) count: ' + routeNodeCount + ' have the correct mapping', function () {
      (0, _chai.expect)((0, _getRouteMap2.default)(routes)).to.eql(result);
    });
  });
});
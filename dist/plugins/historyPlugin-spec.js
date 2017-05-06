'use strict';

require('jsdom-global/register');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _chai = require('chai');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _historyPlugin = require('./historyPlugin');

var _historyPlugin2 = _interopRequireDefault(_historyPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mockWindow(params) {
  if (typeof window === 'undefined') {
    window = {};
  }
  Object.assign(window, params);
}

describe('HistoryPlugin', function () {
  beforeEach(function () {
    mockWindow({ history: _sinon2.default.spy() });
  });

  afterEach(function () {
    window = null;
  });

  it('should call "history.pushState" with params', function () {
    var route = {
      meta: { title: 'foo', description: 'bar' }
    };
    var result = (0, _historyPlugin2.default)('/foo', route, false);
  });
});
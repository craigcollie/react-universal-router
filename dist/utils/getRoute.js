'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _filter = require('lodash/filter');

var _filter2 = _interopRequireDefault(_filter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isPathMatch = function isPathMatch(item, sanitizedUrl) {
  return item.props.path === sanitizedUrl;
};

//  Ensure the child components we're matching
//  are 'Route' and the path matches
var getRoute = function getRoute(routes, url) {
  return (0, _filter2.default)(routes().props.children, function (item) {
    return isPathMatch(item, url);
  });
};

exports.default = getRoute;
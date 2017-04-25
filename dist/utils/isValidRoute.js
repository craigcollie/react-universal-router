'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _map = require('lodash/map');

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isValidRoute = function isValidRoute(url, routes) {
  var validRoutes = (0, _map2.default)(routes().props.children, function (item) {
    return item.props.path;
  });

  return validRoutes.indexOf(url) !== -1;
};

exports.default = isValidRoute;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _set = require('lodash/set');

var _set2 = _interopRequireDefault(_set);

var _forEach = require('lodash/forEach');

var _forEach2 = _interopRequireDefault(_forEach);

var _server = require('react-dom/server');

var _resolveRoute = require('./utils/resolveRoute');

var _resolveRoute2 = _interopRequireDefault(_resolveRoute);

var _parseUrl2 = require('./utils/parseUrl');

var _parseUrl3 = _interopRequireDefault(_parseUrl2);

var _matchRoute = require('./utils/matchRoute');

var _matchRoute2 = _interopRequireDefault(_matchRoute);

var _getTemplateTokens = require('./utils/getTemplateTokens');

var _getTemplateTokens2 = _interopRequireDefault(_getTemplateTokens);

var _getParamsFromUrl = require('./utils/getParamsFromUrl');

var _getParamsFromUrl2 = _interopRequireDefault(_getParamsFromUrl);

var _getRouteMap = require('./utils/getRouteMap');

var _getRouteMap2 = _interopRequireDefault(_getRouteMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function generateServerProps(props, root) {
  var dataProps = JSON.stringify(props);
  return '\n      <script id=\'app-props\' type=\'application/json\'>\n        <![CDATA[' + dataProps + ']]>\n      </script>\n      <div>' + (0, _server.renderToString)(root(props)) + '</div>\n    ';
}

function createTinyServer(_ref) {
  var clientApp = _ref.clientApp,
      routes = _ref.routes,
      template = _ref.template;

  return function (req, res, next) {
    var _parseUrl = (0, _parseUrl3.default)(req.url),
        pathname = _parseUrl.pathname,
        search = _parseUrl.search;

    var currentRoute = (0, _matchRoute2.default)(routes, pathname);

    //  If no routes match, handoff to next middleware
    if (JSON.stringify(currentRoute) === JSON.stringify({})) {
      return next();
    }

    var path = currentRoute.path,
        resolve = currentRoute.resolve;

    //  Convert URL to params

    var routeParams = (0, _getParamsFromUrl2.default)(path, pathname);
    var routeMap = (0, _getRouteMap2.default)(routes);

    (0, _resolveRoute2.default)(resolve, routeParams).then(function (resolvedData) {
      var templateString = template.toString();
      var templateTokens = (0, _getTemplateTokens2.default)(templateString, currentRoute);

      //  Populate the token and apply any
      var tokenProps = {};

      (0, _forEach2.default)(templateTokens, function (val, key) {
        (0, _set2.default)(tokenProps, key, val);
        templateString = templateString.replace('<% ' + key + ' %>', val);
      });

      var props = _extends({
        location: { pathname: pathname, search: search },
        resolvedData: resolvedData,
        routeMap: routeMap
      }, tokenProps);

      //  Populate the appRoot with the
      //  injected server-side props
      templateString = templateString.replace('<% appRoot %>', generateServerProps(props, clientApp));

      res.send(templateString);
    });
  };
}

exports.default = createTinyServer;
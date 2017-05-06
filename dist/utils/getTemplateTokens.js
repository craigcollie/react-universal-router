'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = require('lodash-es/get');

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getTemplateTokens(templateString, route) {
  var tokensInTemplate = templateString.match(/<%(.*?)%>/g);

  if (!tokensInTemplate) return {};

  return tokensInTemplate.map(function (token) {
    return token.replace(/<|>|%|\s/g, '');
  }).filter(function (token) {
    return token !== 'appRoot';
  }).reduce(function (acc, token) {
    acc[token] = (0, _get2.default)(route, token);
    return acc;
  }, {});
}
exports.default = getTemplateTokens;
//# sourceMappingURL=getTemplateTokens.js.map
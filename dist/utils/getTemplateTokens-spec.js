'use strict';

var _chai = require('chai');

var _getTemplateTokens = require('./getTemplateTokens');

var _getTemplateTokens2 = _interopRequireDefault(_getTemplateTokens);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Utils: getTemplateTokens', function () {
  var tests = [{
    template: '<% appRoot %><% foo %><% meta.title %>',
    route: { foo: '123', meta: { title: 'blah' } },
    result: { foo: '123', 'meta.title': 'blah' }
  }, {
    template: '<% appRoot %>',
    route: { foo: '123', meta: { title: 'blah' } },
    result: {}
  }, {
    template: '<% foo.blah.wee %>',
    route: { foo: { blah: { wee: 'woo!' } } },
    result: { 'foo.blah.wee': 'woo!' }
  }];

  tests.forEach(function (_ref) {
    var template = _ref.template,
        route = _ref.route,
        result = _ref.result;

    it('should get all tokens from ' + template, function () {
      (0, _chai.expect)((0, _getTemplateTokens2.default)(template, route)).to.eql(result);
    });
  });
});
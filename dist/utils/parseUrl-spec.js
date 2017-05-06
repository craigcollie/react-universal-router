'use strict';

var _chai = require('chai');

var _parseUrl = require('./parseUrl');

var _parseUrl2 = _interopRequireDefault(_parseUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Utils: parseUrl', function () {
  var tests = [{
    location: '/foo/blah',
    result: { pathname: '/foo/blah', search: undefined }
  }, {
    location: '/foo/blah?a=b&c=d',
    result: { pathname: '/foo/blah', search: 'a=b&c=d' }
  }];

  tests.forEach(function (_ref) {
    var location = _ref.location,
        result = _ref.result;

    it('should get the pathname and search from ' + location, function () {
      (0, _chai.expect)((0, _parseUrl2.default)(location)).to.eql(result);
    });
  });
});
//# sourceMappingURL=parseUrl-spec.js.map
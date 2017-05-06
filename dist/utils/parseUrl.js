'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


function parseUrl(url) {
  var urlParts = url.split('?');
  var pathname = urlParts[0];
  var search = urlParts[1];

  return { pathname: pathname, search: search };
}
exports.default = parseUrl;
//# sourceMappingURL=parseUrl.js.map
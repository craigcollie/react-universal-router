'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var hasParam = function hasParam(str) {
  return str.indexOf(':') !== -1;
};


function getParamsFromUrl(userDefinedRoute, locationPathname) {
  var locationPathnameParts = locationPathname.split('/');

  return userDefinedRoute.split('/').reduce(function (acc, part, i, arr) {
    if (hasParam(part)) {
      var _key = arr[i].split(':').pop();
      acc[_key] = locationPathnameParts[i];
    }
    return acc;
  }, {});
}

exports.default = getParamsFromUrl;
//# sourceMappingURL=getParamsFromUrl.js.map
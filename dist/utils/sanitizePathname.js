'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var sanitizePathname = function sanitizePathname(str) {
  return str.replace(/\//g, '');
};

exports.default = sanitizePathname;
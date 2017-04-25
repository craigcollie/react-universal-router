"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var propExtractor = function propExtractor(propContainer) {
  var props = document.getElementById(propContainer).textContent;
  props = props.replace("<![CDATA[", "").replace("]]>", "");

  return JSON.parse(props);
};

exports.default = propExtractor;
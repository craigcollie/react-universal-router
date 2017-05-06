"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getInjectedProps = function getInjectedProps(propContainer) {
  var props = document.getElementById(propContainer).textContent;
  props = props.replace("<![CDATA[", "").replace("]]>", "");

  return JSON.parse(props);
};

exports.default = getInjectedProps;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getInjectedProps = function getInjectedProps(propContainer) {
  var props = document.getElementById(propContainer).textContent;
  props = props.replace("<![CDATA[", "").replace("]]>", ""); // eslint-disable-line
  return JSON.parse(props);
};


function createTinyApp(RootComponent) {
  return _react2.default.createElement(RootComponent, getInjectedProps('app-props'));
}

exports.default = createTinyApp;
//# sourceMappingURL=createTinyApp.js.map
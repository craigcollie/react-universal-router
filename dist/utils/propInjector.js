'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _server = require('react-dom/server');

var propInjector = function propInjector(props, htmlComponent) {
  var Root = htmlComponent;
  var dataProps = JSON.stringify(props);

  return '\n      <script id=\'app-props\' type=\'application/json\'>\n        <![CDATA[' + dataProps + ']]>\n      </script>\n      <div>' + (0, _server.renderToString)(Root(props)) + '</div>\n    ';
};

exports.default = propInjector;
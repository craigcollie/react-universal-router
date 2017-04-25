'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _server = require('react-dom/server');

var propLinker = function propLinker(props, htmlComponent) {
  var Root = htmlComponent;
  var dataProps = JSON.stringify(props);

  var appRoot = '\n      <script id=\'app-props\' type=\'application/json\'>\n        <![CDATA[' + dataProps + ']]>\n      </script>\n      <div>' + (0, _server.renderToString)(Root(props)) + '</div>\n    ';

  return appRoot;
};

exports.default = propLinker;
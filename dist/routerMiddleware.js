'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Router = require('./Router');

function createRouterMiddleware(RootComponent, routes) {
  return function (req, res) {
    var activeRoute = (0, _Router.getRoute)(routes, req.url);
    if (activeRoute.length) {

      //  Perform any route resolves here first
      var currentRoute = activeRoute[0].props;
      var resolve = currentRoute.resolve,
          routeParams = currentRoute.routeParams,
          meta = currentRoute.meta;

      //  Resolve data first, then render the route
      //  and pass props to the client app

      (0, _Router.resolveRoute)(resolve, routeParams).then(function (data) {
        var props = { location: { pathname: req.url }, data: data, meta: meta };

        res.render('./../templates/index.ejs', {
          appRoot: (0, _Router.propLinker)(props, RootComponent),
          title: meta.title,
          description: meta.description
        });
      });
    } else {
      res.send('404: Route not provided');
    }
  };
}

exports.default = createRouterMiddleware;
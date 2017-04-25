import { propLinker, getRoute, resolveRoute } from './Router';

function createTinyServer(RootComponent, routes) {
  return function (req, res, next) {
    const activeRoute = getRoute(routes, req.url);
    if (activeRoute.length) {

      //  Perform any route resolves here first
      const currentRoute = activeRoute[0].props;
      const {
        resolve,
        routeParams,
        meta,
      } = currentRoute;

      //  Resolve data first, then render the route
      //  and pass props to the client app
      resolveRoute(resolve, routeParams).then(data => {
        const props = { location: { pathname: req.url }, data, meta };

        res.render('./../templates/index.ejs', {
          appRoot: propLinker(props, RootComponent),
          title: meta.title,
          description: meta.description,
        });
      });

    } else {
      next();
    }
  }
}

export default createTinyServer;
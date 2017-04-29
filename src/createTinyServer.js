import propInjector from './utils/propInjector';
import matchRoute from './utils/matchRoute';
import resolveRoute from './utils/resolveRoute';

function createTinyServer(RootComponent, routes, template) {

  //  Express middleware
  return function (req, res, next) {
    const activeRoute = matchRoute(routes, req.url);
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
      resolveRoute(resolve, routeParams).then(resolvedData => {
        const props = {
          location: {
            pathname: req.url
          },
          resolvedData,
          meta
        };

        res.render(template, {
          appRoot: propInjector(props, RootComponent),
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

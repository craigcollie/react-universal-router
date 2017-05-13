import curry from 'lodash/curry';

import serverWrapper from './wrappers/serverWrapper';
import resolveRoute from './utils/resolveRoute';
import parseUrl from './utils/parseUrl';
import matchRoute from './utils/matchRoute';
import getParamsFromUrl from './utils/getParamsFromUrl';
import getRouteMap from './utils/getRouteMap';
import hasMatchingRoute from './utils/hasMatchingRoute';
import parseTemplate from './utils/parseTemplate';

import { handleSuccess, handleError } from './handlers/handlers';

function createTinyServer(config) {
  const { entry, ...restConfig } = config;
  const { rootComponent, routes, template } = entry;

  return function (req, res, next) { // eslint-disable-line

    const successHandler = curry(handleSuccess)(res);
    const errorHandler = curry(handleError)(res);

    const { pathname, search } = parseUrl(req.url);
    const currentRoute = matchRoute(routes, pathname);

    if (!hasMatchingRoute(currentRoute)) return next();

    const { path, resolve } = currentRoute;
    const routeParams = getParamsFromUrl(path, pathname);
    const routeMap = getRouteMap(routes);

    resolveRoute(resolve, routeParams)
      .then((resolvedData) => {
        const appRoot = serverWrapper(
          rootComponent,
          routes,
          {
            location: { pathname, search },
            resolvedData,
            routeMap,
            ...restConfig, // Append lifecycle methods to props
          },
        );

        //  Try to parse the template
        return parseTemplate(template, currentRoute, appRoot);
      })
      .then(successHandler)
      .catch(errorHandler);
  };
}

export default createTinyServer;

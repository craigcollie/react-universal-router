import curry from 'lodash/curry';

import serverWrapper from './wrappers/serverWrapper';
import { prefetchRoute } from './utils/resolveRoute';
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

    let routeParams;
    let routeMap;
    const { path, resolve } = currentRoute;

    try {
      routeParams = getParamsFromUrl(path, pathname);
      routeMap = getRouteMap(routes);
    } catch (error) {
      errorHandler(error);
      throw new Error(error.stack);
    }

    const generateServerWrapper = (resolvedData) => {
      const appRoot = serverWrapper(rootComponent, routes, {
        location: { pathname, search },
        resolvedData,
        routeMap,
        ...restConfig,
      });
      return parseTemplate(template, currentRoute, appRoot);
    };

    const promiseChain = () => (
      prefetchRoute(resolve, routeParams)
        .then(generateServerWrapper)
    );

    promiseChain()
      .then(successHandler, errorHandler)
      .catch(errorHandler);
  };
}

export default createTinyServer;

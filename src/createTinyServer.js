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
import TinyError from './handlers/TinyError';

function createTinyServer(config) {
  const { entry, ...restConfig } = config;
  const { rootComponent, routes, template } = entry;

  return function (req, res, next) { // eslint-disable-line
    //  Add response to success and error handling
    const successHandler = curry(handleSuccess)(res);
    const errorHandler = curry(handleError)(res);

    //  Sanity checks to ensure the entry configuration
    //  has all required properties, otherwise throw a friendly error
    const requiredEntryItems = ['rootComponent', 'routes', 'template'];
    requiredEntryItems.forEach((item) => {
      if (!entry[item]) {
        const error = new TinyError('api.error', item);
        errorHandler(error);
        throw new Error(error.stack);
      }
    });

    const { pathname, search } = parseUrl(req.url);
    const currentRoute = matchRoute(routes, pathname);

    //  If the current route fails to match
    //  then hand off the request to the next middleware
    if (!hasMatchingRoute(currentRoute)) return next();

    let routeParams;
    let routeMap;
    const { path, resolve } = currentRoute;

    //  Try to get the routeParams and routeMap
    //  from the supplied routes
    try {
      routeParams = getParamsFromUrl(path, pathname);
      routeMap = getRouteMap(routes);
    } catch (error) {
      errorHandler(error);
      throw new Error(error.stack);
    }

    const generateServerWrapper = resolvedData => (
      serverWrapper(rootComponent, routes, {
        location: { pathname, search },
        resolvedData,
        routeMap,
        ...restConfig,
      })
    );

    const getParsedTemplate = appRoot => (
      parseTemplate(template, currentRoute, appRoot)
    );

    prefetchRoute(resolve, routeParams)
      .then(generateServerWrapper)
      .then(getParsedTemplate)
      .then(successHandler, errorHandler)
      .catch(errorHandler);
  };
}

export default createTinyServer;

import curry from 'lodash/curry';

import { serverWrapper } from './universalWrappers';
import resolveRoute from './utils/resolveRoute';
import parseUrl from './utils/parseUrl';
import matchRoute from './utils/matchRoute';
import getParamsFromUrl from './utils/getParamsFromUrl';
import getRouteMap from './utils/getRouteMap';
import hasMatchingRoute from './utils/hasMatchingRoute';
import parseTemplate from './utils/parseTemplate';

const handleSuccess = (res, response) => (res.send(response));
const handleError = (res, error) => (res.status(500).send(error));

function createTinyServer(RootComponent, Routes, template) {
  return function (req, res, next) { // eslint-disable-line

    const successHandler = curry(handleSuccess)(res);
    const errorHandler = curry(handleError)(res);

    const { pathname, search } = parseUrl(req.url);
    const currentRoute = matchRoute(Routes, pathname);

    if (!hasMatchingRoute(currentRoute)) return next();

    const { path, resolve } = currentRoute;
    const routeParams = getParamsFromUrl(path, pathname);
    const routeMap = getRouteMap(Routes);

    resolveRoute(resolve, routeParams)
      .then((resolvedData) => {
        const appRoot = serverWrapper(RootComponent, Routes, {
          location: { pathname, search },
          resolvedData,
          routeMap,
        });
        const response = parseTemplate(template.toString(), currentRoute, appRoot);

        successHandler(response);
      }, errorHandler);
  };
}

export default createTinyServer;

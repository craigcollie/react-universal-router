// @flow
import { serverWrapper } from './universalWrappers';
import resolveRoute from './utils/resolveRoute';
import parseUrl from './utils/parseUrl';
import matchRoute from './utils/matchRoute';
import getTemplateTokens from './utils/getTemplateTokens';
import getParamsFromUrl from './utils/getParamsFromUrl';
import getRouteMap from './utils/getRouteMap';
import hasMatchingRoute from './utils/hasMatchingRoute';
import getTokenProps from './utils/getTokenProps';
import parseTemplate from './utils/parseTemplate';

import type { RouteNodes } from './types/Route';

type Req = { url: string };
type Res = { send: Function };

function createTinyServer(
  RootComponent: Function,
  Routes: RouteNodes,
  template: string,
) {
  return function (
    req: Req,
    res: Res,
    next: Function,
  ) {
    const { pathname, search } = parseUrl(req.url);
    const currentRoute = matchRoute(Routes, pathname);

    if (!hasMatchingRoute(currentRoute)) return next();

    const { path, resolve } = currentRoute;

    //  Convert URL to params
    const routeParams = getParamsFromUrl(path, pathname);
    const routeMap = getRouteMap(Routes);

    resolveRoute(resolve, routeParams)
      .then((resolvedData) => {
        const templateString = template.toString();
        const tokens = getTemplateTokens(templateString, currentRoute);
        const tokenProps = getTokenProps(tokens);

        const appRoot = serverWrapper(RootComponent, Routes, {
          location: {
            pathname,
            search,
          },
          resolvedData,
          routeMap,
          ...tokenProps,
        });

        res.send(parseTemplate(templateString, tokens, appRoot));
      });
  };
}

export default createTinyServer;

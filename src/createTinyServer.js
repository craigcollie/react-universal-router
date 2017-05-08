// @flow
import set from 'lodash/set';
import forEach from 'lodash/forEach';

import { wrapServerApp } from './createUniversalWrappers';
import resolveRoute from './utils/resolveRoute';
import parseUrl from './utils/parseUrl';
import matchRoute from './utils/matchRoute';
import getTemplateTokens from './utils/getTemplateTokens';
import getParamsFromUrl from './utils/getParamsFromUrl';
import getRouteMap from './utils/getRouteMap';

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

    //  If no routes match, handoff to next middleware
    if (JSON.stringify(currentRoute) === JSON.stringify({})) {
      return next();
    }

    const { path, resolve } = currentRoute;

    //  Convert URL to params
    const routeParams = getParamsFromUrl(path, pathname);
    const routeMap = getRouteMap(Routes);

    resolveRoute(resolve, routeParams)
      .then((resolvedData) => {
        let templateString = template.toString();
        const templateTokens = getTemplateTokens(templateString, currentRoute);

        //  Populate the token and apply any
        const tokenProps = {};

        forEach(templateTokens, (val, key) => {
          set(tokenProps, key, val);
          templateString = templateString.replace(`<% ${key} %>`, val);
        });

        //  Replace <% appRoot %> with the wrapped
        //  <RouteProvider /> wrapped root component
        templateString = templateString.replace(
          '<% appRoot %>',
          wrapServerApp(RootComponent, Routes, {
            location: {
              pathname,
              search,
            },
            resolvedData,
            routeMap,
            ...tokenProps,
          },
        ));

        res.send(templateString);
      });
  };
}

export default createTinyServer;

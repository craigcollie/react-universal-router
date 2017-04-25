import React, { Component } from 'react';

import { Route } from './Router';

const isActive = (pathname, path) => (pathname === path);

export const Router = ({
  routes,
  location,
  data: resolvedData,
}) => {
  return (
    <div>
      {routes.map((route, i) => {
        const { path } = route.props;

        const routeProps = {
          ...route.props,
          resolvedData
        };

        return (
          isActive(location.pathname, path) &&
          <Route key={i} {...routeProps} />
        );
      })}
    </div>
  )
};

//  Exported components
export Route from './Route';
export Link from './Link';
export RoutingProvider from './RoutingProvider';
export clientRender from './clientRender';

//  Exported utils
export isValidRoute from './utils/isValidRoute';
export propExtractor from './utils/propExtractor';
export propLinker from './utils/propLinker';
export getRoute from './utils/getRoute';
export resolveRoute from './utils/resolveRoute';
export sanitizePathname from './utils/sanitizePathname';

//  Express middleware
export createTinyServer from './serverRender';

export default Router;
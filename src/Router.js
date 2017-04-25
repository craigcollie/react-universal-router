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

//  Exported utils
export getInjectedProps from './utils/getInjectedProps';
export propInjector from './utils/propInjector';
export matchRoute from './utils/matchRoute';
export resolveRoute from './utils/resolveRoute';
export sanitizePathname from './utils/sanitizePathname';

export createTinyApp from './createTinyApp';
export createTinyServer from './createTinyServer';

export default Router;
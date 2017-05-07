// @flow
import React, { PropTypes } from 'react';

import matchRoute from './../../utils/matchRoute';
import getParamsFromUrl from './../../utils/getParamsFromUrl';

type Props = null;
type Context = {
  getLocation: Function,
  getRoutes: Function,
  getResolvedData: Function,
};

const Router = (props: Props, context: Context) => {
  const {
    getLocation,
    getRoutes,
    getResolvedData,
  } = context;

  //  Get location from <RouteProvider />
  const location = getLocation();

  //  Get data from <RouteProvider />
  const resolvedData = getResolvedData(location.pathname);

  //  Routes can be pattern matched
  //  So a /path/:id can be used
  const { path, component: ComponentView } = matchRoute(getRoutes(), location.pathname);
  const routeParams = getParamsFromUrl(path, location.pathname);

  return (
    <ComponentView
      location={location}
      resolvedData={resolvedData}
      routeParams={routeParams}
    />
  );
};

Router.contextTypes = {
  getLocation: PropTypes.func,
  getRoutes: PropTypes.func,
  getResolvedData: PropTypes.func,
};

export default Router;

import React, { PropTypes, Component } from 'react';

import matchRoute from './../../utils/matchRoute';
import getParamsFromUrl from './../../utils/getParamsFromUrl';

class Router extends Component {
  constructor() {
    super();

    this.state = {
      activeRoute: null,
    };
  }

  render() {
    const {
      getLocation,
      getRoutes,
      getResolvedData,
    } = this.context;

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
        activeRoute={location.pathname}
        resolvedData={resolvedData}
        routeParams={routeParams}
      />
    );
  }
}

Router.contextTypes = {
  getLocation: PropTypes.func,
  getRoutes: PropTypes.func,
  getResolvedData: PropTypes.func,
};

export default Router;

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import matchRoute from './../utils/matchRoute';

class Router extends Component {
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
    const {
      component: ComponentView
    } = matchRoute(getRoutes(), location.pathname);

    return (
      <ComponentView
        location={location}
        resolvedData={resolvedData}
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

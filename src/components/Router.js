import React, { Component } from 'react';
import isArray from 'lodash/isArray';
import PropTypes from 'prop-types';

/* @name Router
 * @description Replaces the <Route /> with the required component
                and injects resolved props and location from the routing context
 */
class Router extends Component {
  render() {
    const {
      getLocation,
      getRoutes,
      getRouteMap
    } = this.context;

    const location = getLocation();
    const routes = getRoutes();

    const mapVisibleRoute = (route) => {
      const { path, component: ComponentView } = route.props;
      const { resolvedData } = getRouteMap(path);

      return (
        <ComponentView
          location={location}
          resolvedData={resolvedData}
        />
      );
    };

    if (isArray(routes)) {
      return getRoutes()
        .filter(route => (location.pathname === route.props.path))
        .map(mapVisibleRoute)[0];
    }

    if (routes.props.path !== location.pathname) {
      return (<div>Route not found</div>);
    }

    return mapVisibleRoute(routes);
  }
}

Router.contextTypes = {
  getLocation: PropTypes.func.isRequired,
  getRoutes: PropTypes.func.isRequired,
  getRouteMap: PropTypes.func,
};

export default Router;

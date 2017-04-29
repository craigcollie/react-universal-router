import React, { Component } from 'react';
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

    return getRoutes()
      .filter(route => (location.pathname === route.props.path))
      .map(route => {
        const { path, component: ComponentView } = route.props;
        const { resolvedData } = getRouteMap(path);

        //  Pass location and resolvedData props
        //  to the active route
        return (
          <ComponentView
            location={location}
            resolvedData={resolvedData}
          />
        );
      })[0];
  }
}

Router.contextTypes = {
  getLocation: PropTypes.func.isRequired,
  getRoutes: PropTypes.func.isRequired,
  getRouteMap: PropTypes.func,
};

export default Router;

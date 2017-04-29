import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* @name Router
 * @description Replaces the <Route /> with the required component
 and injects resolved props and location from the routing context
 */
class Router extends Component {
  render() {
    const {
      location,
      routes,
      getRouteMap
    } = this.context;

    const activeRoute = routes
      .filter(route => (location.pathname === route.props.path))
      .map(route => {
        const { path, component: ComponentView } = route.props;
        const { resolvedData } = getRouteMap(path);

        const routeProps = {
          location,
          resolvedData,
        };

        return (
          <ComponentView {...routeProps} />
        );
      })[0];

    return activeRoute;
  }
}

Router.contextTypes = {
  location: PropTypes.object,
  routes: PropTypes.array,
  getRouteMap: PropTypes.func,
};

export default Router;

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Route from './Route';

class Router extends Component {
  render() {
    const { location, routes, getRouteMap } = this.context;

    const activeRoute = routes
      .filter(route => (location.pathname === route.props.path))
      .map(route => {
        const { path } = route.props;
        const { resolvedData } = getRouteMap(path);
        const routeProps = {
          ...route.props,
          resolvedData
        };

        return (
          <Route {...routeProps} />
        );
      })[0];

    return (<div>{activeRoute}</div>);
  }
}

Router.contextTypes = {
  location: PropTypes.object,
  routes: PropTypes.array,
  getRouteMap: PropTypes.func,
};

export default Router;

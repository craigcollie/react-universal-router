import url from 'url';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import forEach from 'lodash/forEach';

import syncRouteMap from './../utils/syncRouteMap';
import createRouteMapping from './../utils/createRouteMapping';
import matchRoute from './../utils/matchRoute';
import getParamsFromUrl from './../utils/getParamsFromUrl';

class RoutingProvider extends Component {
  constructor(props) {
    super(props);

    const {
      location,
      routeMap,
      routes,
      resolvedData
    } = props;

    this.state = {
      location,
      routeMap,
      routes: routes().props.children,
      data: {
        //  Add server data to initial route
        [location.pathname]: resolvedData,
      }
    };

    this.onRouteChange = this.onRouteChange.bind(this);
  }

  getChildContext() {
    const { location, data, routes } = this.state;
    return {
      getLocation: () => (location),
      getRoutes: () => (routes),
      getResolvedData: (pathname) => (data[pathname]),
      onRouteChange: this.onRouteChange,
    };
  }

  componentDidMount() {
    window.onpopstate = () => {
      const { pathname, search } = window.location;
      const locationString = `${pathname}${search}`;
      this.onRouteChange(locationString, true);
    };
  }

  updateRoute(location, resolvedData) {
    const { data } = this.state;
    const { pathname, search } = location;

    this.setState({
      location,
      data: { [pathname]: (resolvedData || data[pathname]) },
    });
  }

  onRouteChange(locationString, isHistoryEvent) {
    const { pathname, search } = url.parse(locationString);
    const { routes } = this.state;
    const route = matchRoute(routes, pathname);

    if (!route) {
      throw new Error(`${pathname} has no valid route`);
    }

    const { resolve } = route;

    //  Add route change to window history
    if (!isHistoryEvent) {
      history.pushState({ page: locationString }, locationString, locationString);
    }

    //  Resolve route data and setState()
    const routeParams = getParamsFromUrl(route.path, pathname);

    if (!resolve) {
      this.updateRoute({ pathname, search });
    } else {
      resolve(routeParams)
        .then(data => {
          this.updateRoute({ pathname, search }, data);
        });
    }
  }

  render() {
    return (
      <div>{this.props.children}</div>
    );
  }
}

RoutingProvider.childContextTypes = {
  getLocation: PropTypes.func,
  getRoutes: PropTypes.func,
  getResolvedData: PropTypes.func,
  onRouteChange: PropTypes.func,
};

export default RoutingProvider;

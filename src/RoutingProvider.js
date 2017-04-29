import React, { Component } from 'react';
import PropTypes from 'prop-types';

import resolveRoute from './utils/resolveRoute';
import getRouteMapping from './utils/getRouteMapping';

class RoutingProvider extends Component {
  constructor(props) {
    super(props);

    const { location, resolvedData, routes } = props;
    const { pathname } = location;

    const definedRoutes = routes().props.children;
    const routeMapping = getRouteMapping(definedRoutes, location, resolvedData);

    //  Create our route state object from
    //  connected Route components
    this.state = {
      location: { pathname },
      routes: definedRoutes,
      routeMapping,
    };

    this.updateRouteMap = this.updateRouteMap.bind(this);
    this.registerRouteChange = this.registerRouteChange.bind(this);
  }

  getChildContext() {
    const { routes, location, routeMapping } = this.state;
    return {
      updateRouteMap: this.updateRouteMap,
      registerRouteChange: this.registerRouteChange,
      getRouteMap: (path) => (routeMapping[path]),
      routes,
      location,
    }
  }

  componentDidMount() {
    const { location, data } = this.props;

    //  Update initial mounting location with data
    //  from isomorphic resolve
    this.updateRouteMap(location.pathname, data);

    //  Add the event listener for popstate
    //  check for window.onpopstate and
    //  history and fallback if not available
    window.onpopstate = () => {
      this.registerRouteChange(window.location.pathname, true);
    };
  }

  //  Maps the current pathname to data
  //  -> Set on init from isomorphic
  updateRouteMap(pathname, resolvedData) {
    const { routeMapping } = this.state;

    this.setState({
      routeMapping: Object.assign({}, routeMapping, {
        [pathname]: {
          ...routeMapping[pathname],
          resolvedData: resolvedData
            ? resolvedData
            : routeMapping[pathname].resolvedData
        }
      }),
      location: {
        pathname,
      }
    });
  }

  registerRouteChange(pathname, isHistoryEvent) {
    const { routeMapping } = this.state;
    const { resolve, routeParams, cache, data, meta } = routeMapping[pathname];

    if (meta) {
      const { title, description } = meta;
      document.title = title;
      document.querySelector('meta[name="description"]').setAttribute("content", description);
    }

    //  Update push state
    if (!isHistoryEvent) {
      history.pushState({page: pathname}, meta.title, pathname);
    }

    //  If caching is on, then we should only
    //  resolve the route data once
    const shouldFetchData = (cache && !data) || (!cache);

    if (!shouldFetchData) {
      //  Update the routeMap only
      this.updateRouteMap(pathname, null);
    } else {
      //  Get data and update the route map
      resolveRoute(resolve, routeParams)
        .then(data => this.updateRouteMap(pathname, data));
    }
  }

  render() {
    return (
      <div>{this.props.children}</div>
    )
  }
}

RoutingProvider.childContextTypes = {
  updateRouteMap: PropTypes.func,
  registerRouteChange: PropTypes.func,
  routes: PropTypes.array,
  location: PropTypes.object,
  getRouteMap: PropTypes.func,
};

export default RoutingProvider;

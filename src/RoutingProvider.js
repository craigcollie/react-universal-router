import url from 'url';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import resolveRoute from './utils/resolveRoute';
import getRouteMapping from './utils/getRouteMapping';

class RoutingProvider extends Component {
  constructor(props) {
    super(props);

    const { location, resolvedData, routes } = props;

    const definedRoutes = routes().props.children;
    const routeMapping = getRouteMapping(definedRoutes, location, resolvedData);

    //  Create our route state object from
    //  connected Route components
    this.state = {
      location,
      routes: definedRoutes,
      routeMapping,
    };

    this.updateRouteMap = this.updateRouteMap.bind(this);
    this.onRouteChange = this.onRouteChange.bind(this);
  }

  getChildContext() {
    const { routes, location, routeMapping } = this.state;
    return {
      updateRouteMap: this.updateRouteMap,
      onRouteChange: this.onRouteChange,
      getRouteMap: (path) => (routeMapping[path]),
      routes,
      location,
    }
  }

  componentDidMount() {
    const { location, data } = this.props;

    //  Update initial mounting location with data
    //  from isomorphic resolve
    this.updateRouteMap(location, data);

    //  Add the event listener for popstate
    //  check for window.onpopstate and
    //  history and fallback if not available
    window.onpopstate = () => {
      this.registerRouteChange(window.location.pathname, true);
    };
  }

  //  Maps the current pathname to data
  //  -> Set on init from isomorphic
  updateRouteMap(location, resolvedData) {
    const { routeMapping } = this.state;
    const { pathname } = location;

    this.setState({
      routeMapping: Object.assign({}, routeMapping, {
        [pathname]: {
          ...routeMapping[pathname],
          resolvedData: resolvedData
            ? resolvedData
            : routeMapping[pathname].resolvedData
        }
      }),
      location
    });
  }

  onRouteChange(locationString, isHistoryEvent) {
    const { pathname, search } = url.parse(locationString);
    const { routeMapping } = this.state;
    const { resolve, routeParams, cache, data, meta } = routeMapping[pathname];

    if (meta) {
      const { title, description } = meta;
      document.title = title;
      document.querySelector('meta[name="description"]').setAttribute("content", description);
    }

    //  Update push state
    if (!isHistoryEvent) {
      history.pushState({ page: locationString }, meta.title, locationString);
    }

    //  If caching is on, then we should only
    //  resolve the route data once
    const shouldFetchData = (cache && !data) || (!cache);

    if (!shouldFetchData) {
      this.updateRouteMap({ pathname, search }, null);
    } else {
      resolveRoute(resolve, routeParams)
        .then(data => this.updateRouteMap({ pathname, search }, data));
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
  onRouteChange: PropTypes.func,
  routes: PropTypes.array,
  location: PropTypes.object,
  getRouteMap: PropTypes.func,
};

export default RoutingProvider;

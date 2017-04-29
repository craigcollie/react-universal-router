import url from 'url';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import forEach from 'lodash/forEach';

import metaPlugin from './../plugins/metaPlugin';
import historyPlugin from './../plugins/historyPlugin';
import resolveRoutePlugin from './../plugins/resolveRoutePlugin';

import syncRouteMap from './../utils/syncRouteMap';
import createRouteMapping from './../utils/createRouteMapping';

class RoutingProvider extends Component {
  constructor(props) {
    super(props);

    const { location, resolvedData, routes } = props;
    const definedRoutes = routes().props.children;
    const routeMapping = createRouteMapping(definedRoutes, location, resolvedData);

    //  Create our route state object from
    //  connected Route components
    this.state = {
      location,
      routes: definedRoutes,
      routeMapping,
    };

    //  TODO - extend this from the context definition
    this.plugins = {
      metaPlugin,
      historyPlugin,
      resolveRoutePlugin,
    };

    this.updateRouteMap = this.updateRouteMap.bind(this);
    this.onRouteChange = this.onRouteChange.bind(this);
  }

  getChildContext() {
    const {
      routes,
      location,
      routeMapping
    } = this.state;

    return {
      onRouteChange: this.onRouteChange,
      getRouteMap: (path) => (routeMapping[path]),
      getRoutes: () => (routes),
      getLocation: () => (location),
    }
  }

  componentDidMount() {
    //  Listen for browser history changes
    window.onpopstate = () => {
      const { pathname, search } = window.location;
      const locationString = `${pathname}${search}`;
      this.onRouteChange(locationString, true);
    };
  }

  //  Maps the current pathname to data
  //  -> Set on init from isomorphic
  updateRouteMap(location, resolvedData) {
    const { routeMapping } = this.state;
    this.setState(syncRouteMap(location, routeMapping, resolvedData));
  }

  onRouteChange(newLocation, isHistoryEvent) {
    const { pathname } = url.parse(newLocation);
    const { routeMapping } = this.state;
    const route = routeMapping[pathname];

    if (!route) {
      throw new Error(`${pathname} is not a valid route`);
    }

    forEach(this.plugins, plugin =>
      plugin.apply(this, [ newLocation, route, isHistoryEvent ])
    );
  }

  render() {
    return (
      <div>{this.props.children}</div>
    )
  }
}

RoutingProvider.childContextTypes = {
  onRouteChange: PropTypes.func,
  getRoutes: PropTypes.func,
  getLocation: PropTypes.func,
  getRouteMap: PropTypes.func,
};

export default RoutingProvider;

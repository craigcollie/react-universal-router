import url from 'url';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import forEach from 'lodash/forEach';

import metaPlugin from './../plugins/metaPlugin';
import historyPlugin from './../plugins/historyPlugin';
import resolveRoutePlugin from './../plugins/resolveRoutePlugin';

import syncRouteMap from './../utils/syncRouteMap';
import createRouteMapping from './../utils/createRouteMapping';

const getPluginFn = (item) => {
  if (typeof item === 'function') {
    return item;
  } else {
    return item.fn;
  }
};

class RoutingProvider extends Component {
  constructor(props) {
    super(props);

    const { location, resolvedData, routes } = props;
    const routeNodes = routes().props.children;
    const routeMapping = createRouteMapping(routeNodes, location, resolvedData);

    this.state = {
      location,
      routes: routeNodes,
      routeMapping,
    };

    this.updateRouteMap = this.updateRouteMap.bind(this);
    this.onRouteChange = this.onRouteChange.bind(this);

    //  TODO - extend this from the context definition
    this.plugins = {
      metaPlugin,
      historyPlugin,
      resolveRoutePlugin: {
        fn: resolveRoutePlugin,
        callback: this.updateRouteMap,
      },
    };
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
    window.onpopstate = () => {
      const { pathname, search } = window.location;
      const locationString = `${pathname}${search}`;
      this.onRouteChange(locationString, true);
    };
  }

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

    forEach(this.plugins, plugin => (
      getPluginFn(plugin).apply(this, [
        newLocation,
        route,
        isHistoryEvent,
        plugin.callback,
      ])
    ));
  }

  render() {
    return (
      <div>{this.props.children}</div>
    );
  }
}

RoutingProvider.childContextTypes = {
  onRouteChange: PropTypes.func,
  getRoutes: PropTypes.func,
  getLocation: PropTypes.func,
  getRouteMap: PropTypes.func,
};

export default RoutingProvider;

import React, { Children, Component } from 'react';
import PropTypes from 'prop-types';

import resolveRoute from './utils/resolveRoute';
import getRouteMapping from './utils/getRouteMapping';

class RoutingProvider extends Component {
  constructor(props) {
    super(props);

    const { location, data, routes } = props;
    const { pathname } = location;

    //  Get route components (TODO check for Route)
    const definedRoutes = routes().props.children;
    const routeMapping = getRouteMapping(definedRoutes);

    //  Create our route state object from
    //  connected Route components
    this.state = {
      location: { pathname },
      routes: definedRoutes,
      routeMapping,
    };

    //  Hydrate the current route data
    this.state.routeMapping[pathname].data = data;

    this.updateRouteMap = this.updateRouteMap.bind(this);
    this.registerRouteChange = this.registerRouteChange.bind(this);
  }

  getChildContext() {
    return {
      updateRouteMap: this.updateRouteMap,
      registerRouteChange: this.registerRouteChange,
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
  updateRouteMap(pathname, data) {
    const { routeMapping } = this.state;

    this.setState({
      routeMapping: Object.assign({}, routeMapping, {
        [pathname]: {
          ...routeMapping[pathname],
          data: data
            ? data
            : routeMapping[pathname].data
        }
      }),
      location: {
        pathname,
      }
    });
  }

  registerRouteChange(pathname, isHistoryEvent) {
    const { routeMapping } = this.state;
    const {
      resolve,
      routeParams,
      cache,
      data,
      meta,
    } = routeMapping[pathname];

    if (meta) {
      document.title = meta.title;
      document.querySelector('meta[name="description"]')
              .setAttribute("content", meta.description);
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
    //  Location must come from state, and not isomorphic
    //  because the router will change the current pathname
    const { location, routes } = this.state;

    //  Route data should be there for the
    //  initial page load (server) and null for
    //  other subsequent routes (fetch on client)
    const { data } = this.state.routeMapping[location.pathname];

    return (
      <div>
        {Children.map(this.props.children, (child) => (
          React.cloneElement(child, { data, location, routes })
        ))}
      </div>
    )
  }
}

RoutingProvider.childContextTypes = {
  updateRouteMap: PropTypes.func,
  registerRouteChange: PropTypes.func,
};

export default RoutingProvider;

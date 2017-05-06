import React, { PropTypes, Component } from 'react';

import parseUrl from './../utils/parseUrl';
import matchRoute from './../utils/matchRoute';
import getParamsFromUrl from './../utils/getParamsFromUrl';

class RoutingProvider extends Component {
  constructor(props) {
    super(props);

    const {
      location,
      routeMap,
      routes,
      resolvedData = {},
    } = props;

    this.state = {
      location,
      routeMap,
      routes,
      data: {
        [location.pathname]: resolvedData,
      },
    };

    this.onRouteChange = this.onRouteChange.bind(this);
  }

  getChildContext() {
    const { location, data, routes } = this.state;
    return {
      getLocation: () => (location),
      getRoutes: () => (routes),
      getResolvedData: pathname => (data[pathname]),
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

  onRouteChange(locationString, isHistoryEvent) {
    const { pathname, search } = parseUrl(locationString);
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
        .then(data => this.updateRoute({ pathname, search }, data));
    }
  }

  updateRoute(location, resolvedData) {
    const { data } = this.state;
    const { pathname } = location;

    this.setState({
      location,
      data: { [pathname]: (resolvedData || data[pathname]) },
    });
  }

  render() {
    return (
      <div>{this.props.children}</div>
    );
  }
}

RoutingProvider.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string,
  }).isRequired,
  routeMap: PropTypes.shape({
    path: PropTypes.string,
    component: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.component,
    ]),
    resolve: PropTypes.func,
    meta: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
    }),
  }).isRequired,
  routes: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
  ]).isRequired,
  resolvedData: PropTypes.oneOfType([
    PropTypes.any,
  ]),
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
  ]).isRequired,
};

RoutingProvider.defaultProps = {
  resolvedData: {},
};

RoutingProvider.childContextTypes = {
  getLocation: PropTypes.func,
  getRoutes: PropTypes.func,
  getResolvedData: PropTypes.func,
  onRouteChange: PropTypes.func,
};

export default RoutingProvider;

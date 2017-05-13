import React, { PropTypes, Component } from 'react';

import {
  locationShape,
  routeMapShape,
  routeShape,
  resolvedDataShape,
  childrenShape,
} from './../../propTypes/propTypes';

import getString from './../../lang/getString';
import resolveRoute from './../../utils/resolveRoute';
import parseUrl from './../../utils/parseUrl';
import matchRoute from './../../utils/matchRoute';
import getParamsFromUrl from './../../utils/getParamsFromUrl';
import hasMatchingRoute from './../../utils/hasMatchingRoute';

class RoutingProvider extends Component {
  constructor(props) {
    super(props);

    const { location, routeMap, routes, resolvedData } = props;
    const { pathname } = location;

    this.state = {
      location,
      routeMap,
      routes,
      data: { [pathname]: resolvedData },
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
    const location = parseUrl(locationString);
    const { pathname } = location;
    const { routes } = this.state;
    const route = matchRoute(routes, pathname);

    if (!hasMatchingRoute(route)) {
      throw new Error(getString('route.invalid', pathname));
    }

    //  Add route change to window history
    if (!isHistoryEvent) {
      history.pushState({ page: locationString }, locationString, locationString);
    }

    const { resolve, path } = route;
    const routeParams = getParamsFromUrl(path, pathname);

    resolveRoute(resolve, routeParams)
      .then(
        (resolvedData) => {
          this.updateRoute(location, resolvedData);
        },
        (err) => {
          this.updateRoute(location);
          throw new Error(err);
        },
      );
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
  location: locationShape.isRequired,
  routeMap: routeMapShape.isRequired,
  routes: routeShape.isRequired,
  resolvedData: resolvedDataShape,
  children: childrenShape.isRequired,
  afterRouteChange: PropTypes.func,
};

RoutingProvider.childContextTypes = {
  getLocation: PropTypes.func,
  getRoutes: PropTypes.func,
  getResolvedData: PropTypes.func,
  onRouteChange: PropTypes.func,
};

export default RoutingProvider;

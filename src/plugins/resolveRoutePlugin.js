import url from 'url';
import resolveRoute from './../utils/resolveRoute';

function resolve(routeUrl, { cache, resolvedData, resolve, routeParams }, isHistoryEvent) {
  const { pathname, search } = url.parse(routeUrl);

  //  If caching is on, then we should only
  //  resolve the route data once
  const shouldFetchData = (cache && !resolvedData) || (!cache);

  if (!shouldFetchData) {
    this.updateRouteMap({ pathname, search }, null);
  } else {
    resolveRoute(resolve, routeParams)
      .then(data => this.updateRouteMap({ pathname, search }, data));
  }
}

export default resolve;

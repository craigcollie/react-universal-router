import url from 'url';

/* @name resolveRoute
 * @description Tries to resolve data for the route
 */
export const resolveRoute = (routeResolve, routeParams = {}) => {
  return new Promise((resolve) => {
    if (typeof routeResolve === 'function') {
      routeResolve(routeParams)
        .then(res => resolve(res));
    } else {
      resolve(null);
    }
  });
};

/* @name resolveRoutePlugin
 * @description Ensures any route data is resolved (client-side) before the
                new route is visible
 */
function resolveRoutePlugin(routeUrl, { cache, resolvedData, resolve, routeParams }, isHistoryEvent) {
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

export default resolveRoutePlugin;

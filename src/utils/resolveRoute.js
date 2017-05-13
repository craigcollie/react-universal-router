import TinyError from './../handlers/TinyError';

//  TODO - ensure production doesn't kill the application
//  if the prefetching fails
export function prefetchRoute(resolveFn, routeParams) {
  if (resolveFn) {
    return resolveFn(routeParams)
      .then(null, (error) => {
        throw new TinyError('resolve.error', error);
      });
  }
  return Promise.resolve(null);
}

export function resolveRoute(resolveFn, routeParams) {
  if (resolveFn) {
    return resolveFn(routeParams);
  }
  return Promise.resolve(null);
}

export default resolveRoute;

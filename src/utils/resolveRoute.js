import TinyError from './../handlers/TinyError';

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

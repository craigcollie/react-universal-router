function resolveRoute(resolveFn, routeParams) {
  if (resolveFn) {
    return resolveFn(routeParams);
  }
  return Promise.resolve(null);
}

export default resolveRoute;

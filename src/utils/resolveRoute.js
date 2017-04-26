const isPromise = (fn) => (fn.then === 'function');

const resolveRoute = (routeResolve, routeParams = {}) => {
  return new Promise((resolve) => {
    if (typeof routeResolve === 'function') {
      routeResolve(routeParams)
        .then(res => resolve(res));
    } else {
      resolve(null);
    }
  });
};

export default resolveRoute;

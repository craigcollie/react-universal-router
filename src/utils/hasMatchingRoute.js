const hasMatchingRoute = route => (
  JSON.stringify(route) !== JSON.stringify({})
);

export default hasMatchingRoute;

import map from 'lodash/map';

const isValidRoute = (url, routes) => {
  const validRoutes = map(routes().props.children, item => (item.props.path));

  return (validRoutes.indexOf(url) !== -1);
};

export default isValidRoute;

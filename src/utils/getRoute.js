import React, { Children } from 'react';
import filter from 'lodash/filter';

const isPathMatch = (item, sanitizedUrl) =>
  (item.props.path === sanitizedUrl);

//  Ensure the child components we're matching
//  are 'Route' and the path matches
const getRoute = (routes, url) => {
  return filter(routes().props.children, item =>
    (isPathMatch(item, url))
  );
};

export default getRoute;

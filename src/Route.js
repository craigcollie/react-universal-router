import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Route = (props) => {
  const { component: ComponentView } = props;
  return (
    <ComponentView {...props} />
  );
};

Route.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
  ]).isRequired,
  resolve: PropTypes.func,
  routeParams: PropTypes.object,
  meta: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  })
};

export default Route;

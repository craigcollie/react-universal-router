import React from 'react';
import PropTypes from 'prop-types';

const Route = (props) => {
  const { component: ComponentView } = props;
  return (
    <ComponentView {...props} />
  );
};

Route.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
  ]).isRequired,
};

export default Route;

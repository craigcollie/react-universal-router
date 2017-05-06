import React, { PropTypes } from 'react';

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

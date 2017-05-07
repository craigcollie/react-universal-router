import React from 'react';

import { componentShape } from './../../propTypes/propTypes';

const Route = (props) => {
  const { component: ComponentView } = props;
  return (
    <ComponentView {...props} />
  );
};

Route.propTypes = {
  component: componentShape.isRequired,
};

export default Route;

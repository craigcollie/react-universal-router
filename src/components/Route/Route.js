// @flow
import React from 'react';
import { componentShape } from './../../propTypes/propTypes';

import type { Component } from './../../types/ReactTypes';

type Props = {
  component: Component<any>
};

const Route = (props: Props) => {
  const { component: ComponentView } = props;
  return (
    <ComponentView {...props} />
  );
};

Route.propTypes = {
  component: componentShape.isRequired,
};

export default Route;

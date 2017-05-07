// @flow
import React, { PropTypes } from 'react';
import { childrenShape } from './../../propTypes/propTypes';

const handleClick = (event, onRouteChange, to) => {
  event.preventDefault();
  onRouteChange(to);
};

type Props = { to: string, text: string, children: mixed };
type Context = { onRouteChange: Function };

function Link(
  props: Props,
  context: Context,
) {
  const { to, text, children } = props;
  const { onRouteChange } = context;

  return (
    <a
      href={to}
      onClick={event => (handleClick(event, onRouteChange, to))}
    >
      {children || text}
    </a>
  );
}

Link.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string,
  children: childrenShape,
};

Link.contextTypes = {
  onRouteChange: PropTypes.func,
};

export default Link;

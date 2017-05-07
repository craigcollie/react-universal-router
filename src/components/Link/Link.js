import React, { PropTypes } from 'react';

const handleClick = (event, onRouteChange, to) => {
  event.preventDefault();
  onRouteChange(to);
};

function Link(props, context) {
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
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
  ]),
};

Link.contextTypes = {
  onRouteChange: PropTypes.func,
};

export default Link;

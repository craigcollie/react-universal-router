import React, { PropTypes } from 'react';

const handleClick = (event, onRouteChange, to) => {
  event.preventDefault();
  onRouteChange(to);
};

function Link(props, context) {
  const { to, text } = props;
  const { onRouteChange } = context;

  return (
    <a
      href={to}
      onClick={event =>
        (handleClick(event, onRouteChange, to))
      }
    >
      {text}
    </a>
  );
}

Link.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

Link.contextTypes = {
  onRouteChange: PropTypes.func,
};

export default Link;

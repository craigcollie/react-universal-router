import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Link extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const { to: pathname } = this.props;
    const { registerRouteChange } = this.context;
    event.preventDefault();

    //  Update the router
    registerRouteChange(pathname);
  }

  render() {
    const { to, text } = this.props;
    return (
      <a href={to} onClick={this.handleClick}>{text}</a>
    );
  }
}

Link.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string,
};

Link.contextTypes = {
  registerRouteChange: PropTypes.func,
};

export default Link;
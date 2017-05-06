// @flow
import React from 'react';
import type { Component } from './types/ReactTypes';

const getInjectedProps = (propContainer) => {
  let props = document.getElementById(propContainer).textContent;
  props = props.replace('<![CDATA[", "").replace("]]>', '');
  return JSON.parse(props);
};

function createTinyApp(RootComponent: Component<any>) {
  return (<RootComponent {...getInjectedProps('app-props')} />);
}

export default createTinyApp;

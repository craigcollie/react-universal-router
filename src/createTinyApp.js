// @flow
import React from 'react';
import RouteProvider from './components/RouteProvider/RouteProvider';
import type { Component } from './types/ReactTypes';

const getInjectedProps = () => {
  let props = document.getElementById('app-props').textContent;
  props = props.replace("<![CDATA[", "").replace("]]>", ""); // eslint-disable-line
  return JSON.parse(props);
};

function createTinyApp(
  RootComponent: Component<any>,
  Routes
) {
  const clientProps = {
    ...getInjectedProps('app-props'),
    routes: Routes,
  };

  return (
    <RouteProvider {...clientProps}>
      <RootComponent {...clientProps} />
    </RouteProvider>
  );
}

export default createTinyApp;

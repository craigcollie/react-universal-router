import React from 'react';
import { renderToString } from 'react-dom/server';

import RouteProvider from './components/RouteProvider/RouteProvider';

//  Wraps the server-side root component
//  and passes down serverProps
export const serverWrapper = (RootComponent, routes, props) => {
  const dataProps = JSON.stringify(props);
  const wrappedRoot = serverProps => (
    <RouteProvider {...serverProps} routes={routes}>
      <RootComponent />
    </RouteProvider>
  );

  return `
      <script id='app-props' type='application/json'>
        <![CDATA[${dataProps}]]>
      </script>
      <div>${renderToString(wrappedRoot(props))}</div>
    `;
};

//  Unwraps the server-side root component
//  and injects serverProps
export const clientWrapper = (config) => {
  const { entry, ...restConfig } = config;
  const { rootComponent: RootComponent, routes } = entry;

  let props = document.getElementById('app-props').textContent;
  props = props.replace("<![CDATA[", "").replace("]]>", ""); // eslint-disable-line
  const clientProps = {
    ...JSON.parse(props),
    ...restConfig,
  };

  return (
    <RouteProvider {...clientProps} routes={routes}>
      <RootComponent />
    </RouteProvider>
  );
};

import React from 'react';
import { renderToString } from 'react-dom/server';

import RouteProvider from './components/RouteProvider/RouteProvider';

//  Wraps the server-side root component
//  and passes down serverProps
export const wrapServerApp = (RootComponent, routes, props) => {
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
export const wrapClientApp = (RootComponent, routes) => {
  let props = document.getElementById('app-props').textContent;
  props = props.replace("<![CDATA[", "").replace("]]>", ""); // eslint-disable-line

  const serverProps = JSON.parse(props);

  return (
    <RouteProvider {...serverProps} routes={routes}>
      <RootComponent />
    </RouteProvider>
  );
};

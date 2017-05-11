import React from 'react';
import { renderToString } from 'react-dom/server';

import RouteProvider from './../components/RouteProvider/RouteProvider';

//  Wraps the server-side root component
//  and passes down serverProps
const serverWrapper = (RootComponent, routes, props) => {
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

export default serverWrapper;

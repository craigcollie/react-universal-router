import React from 'react';

import RouteProvider from './../components/RouteProvider/RouteProvider';

//  Unwraps the server-side root component
//  and injects serverProps
const clientWrapper = (RootComponent, routes, restConfig) => {
  let props = document.getElementById('app-props').textContent;
  props = props.replace("<![CDATA[", "").replace("]]>", ""); // eslint-disable-line

  const clientProps = {
    ...JSON.parse(props),
    ...restConfig,
  };

  return (
    <RouteProvider
      {...clientProps}
      routes={routes}
    >
      <RootComponent />
    </RouteProvider>
  );
};

export default clientWrapper;

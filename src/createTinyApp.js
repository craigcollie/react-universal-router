import React from 'react';
import ReactDOM from 'react-dom';

import getInjectedProps from './utils/getInjectedProps';

function createTinyApp(RootComponent, elementId = 'root') {
  ReactDOM.render(
    <RootComponent {...getInjectedProps('app-props')} />,
    document.getElementById(elementId)
  );
}

export default createTinyApp;

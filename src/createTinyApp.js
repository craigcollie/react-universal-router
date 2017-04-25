import React from 'react';
import ReactDOM from 'react-dom';

import propExtractor from './utils/getInjectedProps';

function createTinyApp(RootComponent, elementId = 'root') {
  ReactDOM.render(
    <RootComponent {...propExtractor('app-props')} />,
    document.getElementById(elementId)
  );
}

export default createTinyApp;

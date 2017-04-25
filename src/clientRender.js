import React from 'react';
import ReactDOM from 'react-dom';
import { propExtractor } from './Router';

function clientRender(Root, elementId = 'root') {
  ReactDOM.render(
    <Root {...propExtractor('app-props')} />,
    document.getElementById(elementId)
  );
}

export default clientRender;

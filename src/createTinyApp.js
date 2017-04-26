import React, { Component } from 'react';

const getInjectedProps = (propContainer) => {
  let props = document.getElementById(propContainer).textContent;
  props = props.replace("<![CDATA[", "").replace("]]>", "");
  return JSON.parse(props);
};

const createTinyApp = (RootComponent) => (
  <RootComponent {...getInjectedProps('app-props')} />
);

export default createTinyApp;

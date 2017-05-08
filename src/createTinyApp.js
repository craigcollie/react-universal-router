// @flow
import { wrapClientApp } from './createUniversalWrappers';

function createTinyApp(RootComponent, Routes) {
  return wrapClientApp(RootComponent, Routes);
}

export default createTinyApp;

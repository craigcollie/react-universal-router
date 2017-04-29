// @flow
import type { Route } from './../types/Route';

function historyPlugin(location: string, route: Route, isHistoryEvent: boolean) {
  const { meta } = route;

  if (!isHistoryEvent && meta) {
    const { title } = meta;
    const locationObject = { page: location };

    history.pushState(locationObject, title, location);
  }
}

export default historyPlugin;

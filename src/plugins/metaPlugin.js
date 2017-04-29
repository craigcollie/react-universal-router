// @flow
import type { Route } from './../types/Route';

function metaPlugin(
  location: string,
  route: Route,
  isHistoryEvent: boolean
) {
  const { meta = { title: '', description: '' } } = route;
  const { title, description } = meta;

  const metaDescription = document.querySelector('meta[name="description"]') || null;

  if (document.title) {
    document.title = title;
  }

  if (metaDescription) {
    metaDescription.setAttribute("content", description);
  }
}

export default metaPlugin;

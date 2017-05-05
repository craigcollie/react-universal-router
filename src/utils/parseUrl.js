// @flow
import type { Location } from './../types/Location';

function parseUrl(url: string): Location {
  const urlParts = url.split('?');
  const pathname = urlParts[0];
  const search = urlParts[1];

  return { pathname, search };
}

export default parseUrl;

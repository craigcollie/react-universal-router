// @flow
type Params = {
  [key: string]: mixed
};

const hasParam = (str:string) => (str.indexOf(':') !== -1);

function getParamsFromUrl(
  userDefinedRoute: string,
  locationPathname: string,
): Params {
  const locationPathnameParts = locationPathname.split('/');

  return userDefinedRoute.split('/').reduce((acc, part, i, arr) => {
    if (hasParam(part)) {
      const key = arr[i].split(':').pop();
      acc[key] = locationPathnameParts[i];
    }
    return acc;
  }, {});
}

export default getParamsFromUrl;

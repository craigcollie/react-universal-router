// @flow
type Params = {
  [key: string]: mixed
};

const hasParam = (str:string) => (str.indexOf(':') !== -1);

function getParamsFromUrl(
  userDefinedRoute: string,
  locationPathname: string
): Params {
  const locationPathnameParts = locationPathname.split('/');

  return userDefinedRoute.split('/').reduce((acc, part, i, arr) => {
    if (hasParam(part)) {
      const key = arr[i].split(':').pop();
      const value = locationPathnameParts[i];
      acc[key] = value;
    }
    return acc;
  }, {});
}

export default getParamsFromUrl;

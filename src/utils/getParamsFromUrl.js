// @flow
function getParamsFromUrl(routePath, pathname) {
  const pathnameParts = pathname.split('/');
  return routePath.split('/').map((part, i, arr) => {
    if (part.indexOf(':') !== -1) {
      const key = arr[i].split(':').pop();
      return {
        [key]: pathnameParts[i]
      };
    }
  })
  .filter(Boolean)
  .reduce((acc, item) => {
    const key = Object.keys(item)[0];
    const value = Object.values(item)[0];
    acc[key] = value;
    return acc;
  }, {});
}

export default getParamsFromUrl;

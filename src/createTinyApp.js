import clientWrapper from './wrappers/clientWrapper';

export default function (config) {
  const { entry, ...restConfig } = config;
  const { rootComponent: RootComponent, routes } = entry;

  return clientWrapper(RootComponent, routes, restConfig);
}

// @flow

export type Route = {
  meta: { title: string, description: string },
  cache: boolean,
  resolvedData: { [key: string]: any },
  routeParams: { [key: string]: any },
  resolve: Promise<any>,
};

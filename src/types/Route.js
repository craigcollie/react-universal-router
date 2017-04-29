// @flow

export type Route = {
  meta: { title: string, description: string },
  cache: boolean,
  resolvedData: any,
  routeParams: any,
  resolve: () => ({ data: any }),
};

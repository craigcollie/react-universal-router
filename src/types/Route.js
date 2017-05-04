// @flow
import type { FunctionalComponent } from './../types/ReactTypes';

export type Route = {
  path: string,
  meta: { title: string, description: string },
  cache: boolean,
  resolvedData: { [key: string]: any },
  routeParams: { [key: string]: any },
  resolve: Promise<any>,
};

export type RouteComponent = FunctionalComponent<{ props: Route }>;

export type Routes = Array<RouteComponent> | RouteComponent;

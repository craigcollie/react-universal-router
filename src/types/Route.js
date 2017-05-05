// @flow
import type { FunctionalComponent } from './../types/ReactTypes';

export type Route = {
  path: string,
  meta: { title: string, description: string },
  cache: boolean,
  resolvedData: { [key: string]: mixed },
  routeParams: { [key: string]: mixed },
  resolve: Promise<any>,
};

export type RouteComponent = FunctionalComponent<{ props: Route }>;

export type Routes = Array<RouteComponent> | RouteComponent;

export type RouteNodes = () => ({
  props: {
    children: Array<RouteComponent> | RouteComponent,
    [key: string]: mixed
  }
});

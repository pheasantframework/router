import { RouteFunc, SPARouteFunc } from './RouteFunc.ts';

export interface Route extends BaseRoute {
  uri: string;
  callback: RouteFunc;
};

export interface BaseRoute {
  uri: string;
  callback: Function;
}

export interface SPARoute extends BaseRoute {
  uri: string;
  callback: SPARouteFunc
}
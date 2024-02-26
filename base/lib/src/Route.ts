import { RouteFunc } from './RouteFunc.ts';

export type Route = {
  uri: string;
  callback: RouteFunc;
};

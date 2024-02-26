import { RouteResult } from '../req.ts';
import { extractIdFromPath } from './Extract.ts';

// Suppressing errors as this is a web library.

// TODO: Rework function not to use 'Window' API.

// @ts-ignore: Cannot find name 'Window'
// @ts-ignore: Parameter 'window' of exported function has or is using private name 'Window'
// deno-lint-ignore no-explicit-any
export function getRouteRequest(window: any, uri: string, pathregex: RegExp): RouteResult {
  const url = new URL(window.location.href);
  const searchParams = url.searchParams;
  const query: { [key: string]: string; } = {};
  searchParams.forEach((value, key) => {
    query[key] = value;
  });

  const params = extractIdFromPath(url.pathname, pathregex, uri);

  return {
    name: window.location.pathname,
    query: query,
    params: params == null ? undefined : params,
    hash: url.hash,
  };
}

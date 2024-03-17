// deno-lint-ignore-file no-explicit-any
type SPAState = {
    details: object | undefined;
    [key: string]: any;
};

declare class RouteResult {
    name: string;
    query: object | undefined;
    params: object | undefined;
    hash: string | undefined;
}

type RouteFunc = (request: RouteResult) => void;
type SPARouteFunc = (request: RouteResult, state: SPAState) => void;

interface BaseRoute {
    uri: string;
    // deno-lint-ignore ban-types
    callback: Function;
}

interface Route extends BaseRoute {
    uri: string;
    callback: RouteFunc;
}

interface SPARoute extends BaseRoute {
    uri: string;
    callback: SPARouteFunc
}

export class Router {
    constructor(initialRoute?: string);
    routes: Route[];
    initialRoute: string;
    get(uri: string, callback: RouteFunc): void;
    init(): void;
}
export class SPARouter {
    constructor(initialRoute?: string);
    routes: SPARoute[];
    initialRoute: string;
    get(uri: string, callback: SPARouteFunc): void;
    init(): void;
}
export function navigateBack(): void;
export function navigateTo(uri: string, state: object, details: any): void;
export const pushEvent: CustomEvent<any>;

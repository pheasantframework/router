import { Route } from './src/Route.ts';
import { RouteFunc } from './src/RouteFunc.ts';
import { createRegExpFromPath } from './utils/Extract.ts';
import { getRouteRequest } from './utils/Request.ts';

// deno-lint-ignore-file ban-types
class Router {
    routes: Route[];

    constructor() {
        this.routes = [];
    }

    get(uri: string, callback: RouteFunc) {
        if(!uri || !callback) throw new Error('uri or callback must be given');

        if(typeof uri !== "string") throw new Error('typeof uri must be a string');
        if(typeof callback !== "function") throw new TypeError('typeof callback must be a function');
        this.routes.forEach(route=>{
            if(route.uri === uri) throw new Error(`the uri ${route.uri} already exists`);
        });

        const route = {
            uri, 
            callback
        }
        this.routes.push(route);
    }

    init(){
        this.routes.some(route=>{

            const regEx = createRegExpFromPath(route.uri); // i'll explain this conversion to regular expression below
            const path: string = window.location.pathname;

            if (path.match(regEx)) {
                // our route logic is true, return the corresponding callback

                const state = getRouteRequest(window, route.uri, regEx);
                return route.callback.call(this, state);
            }
        })
    }
}

export default Router;
import { Route } from './src/Route.ts';
import { RouteFunc } from './src/RouteFunc.ts';
import { createRegExpFromPath } from './utils/Extract.ts';
import { getRouteRequest } from './utils/Request.ts';

// deno-lint-ignore-file ban-types
/**
 * Class implementation of a Router.
 * 
 * This is a class used to instantiate a web router. 
 * This router has the power to create multiple kinds of routes. These routes can be static like `"/state"` or having parameters like `"/:id"` to get the `id`.
 * 
 * ```typescript
 * let router = new Router();
 * router.get('/', (req) => {
 *   console.log("Hello World");
 * });
 * router.get('/:id', (req) => {
 *   console.log(`ID: ${req.params.id}`);
 * });
 * router.init();
 * ```
 * 
 * More information on functionality is in the function definitions.
 */
class Router {
    /**
     * The list of routes in a router.
     * @type {Route[]}
     */
    routes: Route[];

    /**
     * Constructor to instantiate a new router.
     * As of now, the constructor creates an empty list of routes.
     */
    constructor() {
        this.routes = [];
    }

    /**
     * Function to create and register a new route.
     * 
     * This function is used in registering a new `Route` object that runs the `callback` function whenever the web page navigates to the route described in the `uri` parameter.
     * 
     * ```typescript
     * route.get('/seats/:no', (req) => {
     *   let queryObj = req.query
     * });
     * ```
     * 
     * The function is of type `RouteFunc` which takes in a parameter called `req`. 
     * This parameter contains information about the path, such as defined parameters (`req.params`), queries (`req.query`) and hashes (`req.hash`).
     * 
     * @param {string} uri - The uri path of the router function.
     * @param {RouteFunc} callback - The function called when the window moves to the given uri path.
     */
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

    /**
     * Initialises the router.
     * 
     * This function registers the router and renders the code provided in each route's callback function when the window moves to the given path.
     */
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
import { BaseRouter } from './route/BaseRouter.ts';
import { getState } from "./spa/getState.js";
import { SPARouteFunc } from "./route/RouteFunc.ts";
import { SPARoute } from "./route/Route.ts";
import { getRouteRequest } from '../utils/Request.ts';
import { createRegExpFromPath } from '../utils/Extract.ts';
import { initState } from './spa/initState.js';

// deno-lint-ignore-file ban-types
/**
 * Class implementation of a Single-Page Application (SPA) Router.
 * 
 * This is a lightweight, server-independent and web-based router used in making simple SPAs without the need of a server.
 * With this router, you can make your own SPA and possibly your own PWA.
 * 
 * The SPA Router makes use of current web technology to help in easy, fast and efficient routing of web applications
 * This router has the power to create multiple kinds of routes, as well as pass and receive data/state objects during navigation to and from routes. 
 * These routes can be static like `"/state"` or having parameters like `"/:id"` to get the `id`.
 * 
 * ```typescript
 * let router = new SPARouter();
 * router.get('/', (req, state) => {
 *   console.log("Hello World");
 * });
 * router.get('/:id', (req, state) => {
 *   console.log(`ID: ${req.params.id}, Name: ${state.name}`);
 * });
 * router.init();
 * ```
 * 
 * More information on functionality is in the function definitions.
 */
class SPARouter implements BaseRouter {
    /**
     * @type {SPARoute[]}
     */
    routes: SPARoute[];

    /**
     * The initial route used in the router. 
     * If a route is not defined for this, it is automatically generated with an empty callback.
     * @type {string}
     */
    initialRoute: string;

    /**
     * Constructor to instantiate a new Single-Page Application router.
     * As of now, the constructor creates an empty list of routes.
     * @param {string} initialRoute - The initial route of the router, which defaults to '/'
     */
    constructor(initialRoute: string = '/') {
        this.routes = [];
        this.initialRoute = initialRoute;
        initState(initialRoute)
    }

    /**
     * Function to create and register a new SPA route.
     * 
     * This function is used in registering a new `SPARoute` object that runs the `callback` function whenever the web page navigates to the route described in the `uri` parameter.
     * 
     * ```typescript
     * route.get('/seats/:no', (req, state) => {
     *   let seatNo = req.params.no;
     *   // Assuming an info field was passed with this request.
     *   let seatInfo = state.info;
     * });
     * ```
     * 
     * Moving to this path would then look like the folllowing:
     * ```javascript
     * let element = document.createElement("a");
     * element.addEventListener("click", (event) => {
     *   const data = { 
     *     info: // add some data, 
     *     //... 
     *   };
     *   navigateTo('/seats/3', data);
     * });
     * ```
     * 
     * The function is of type `RouteFunc` which takes in a parameter called `req`. 
     * This parameter contains information about the path, such as defined parameters (`req.params`), queries (`req.query`) and hashes (`req.hash`).
     * 
     * @param uri - The uri path of the router function.
     * @param callback - The function called when the window moves to the given uri path.
     */
    get(uri: string, callback: SPARouteFunc): void {
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
     * If the initial route is not defined, it will generate a route with a null callback for its place.
     */
    init() {
        if (this.routes.find(r => r.uri === '/') === undefined) {
            this.routes.push({
                uri: '/',
                callback: (_) => null
            });
        }
        addEventListener('popstate', (event) => {
            const histstate = getState(event);
            const state = Object.create(histstate, {
                details: {
                    value: {},
                    writable: false
                }
            });
            this.routes.some(route=>{

                const regEx = createRegExpFromPath(route.uri); 
                const path: string = window.location.pathname;
    
                if (path.match(regEx)) {
    
                    const req = getRouteRequest(window, route.uri, regEx);
                    return route.callback.call(this, req, state);
                }
            })
        });
        addEventListener('pushstate', (event) => {
            const histstate = getState(event);
            const state = Object.create(histstate, {
                details: {
                    value: (event as CustomEvent).detail ?? {},
                    writable: false
                }
            });
            this.routes.some(route=>{

                const regEx = createRegExpFromPath(route.uri); 
                const path: string = window.location.pathname;
    
                if (path.match(regEx)) {
    
                    const req = getRouteRequest(window, route.uri, regEx);
                    return route.callback.call(this, req, state);
                }
            })
        });
    }
}

export default SPARouter;
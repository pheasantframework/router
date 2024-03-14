import { BaseRoute } from "./Route.ts";

/**
 * Base Implementation of a Router.
 * 
 * This interface can be used in generating your own router variants with custom functionality and workings.
 * 
 * NOTE: The Custom Router API is not ready yet.
 */
export interface BaseRouter {
    /**
     * The list of routes in a router.
     * @type {BaseRoute[]}
     */
    routes: BaseRoute[];

    /**
     * Function to create and register a new route.
     * 
     * This function is used in registering a new `BaseRoute` object that runs the `callback` function whenever the web page navigates to the route described in the `uri` parameter.
     * 
     * Every implementation of this class should take in a parameter called `req`, and any other additional parameters you would want to add. 
     * This parameter contains information about the path, such as defined parameters (`req.params`), queries (`req.query`) and hashes (`req.hash`).
     * 
     * @param {string} uri - The uri path of the router function.
     * @param {Function} callback - The function called when the window moves to the given uri path.
     */
    get(uri: string, callback: Function): void;

    /**
     * Initialises the router.
     * 
     * This function registers the router and renders the code provided in each route's callback function when the window moves to the given path.
     */
    init(): void;
}
/**
 * A class used to represent the data gotten from a route path, such as the route path, queries, parameters and hashes.
 * 
 * This is the class type for the `req` parameter included in every route callback function.
 */
export class RouteResult {
    /**
     * The name of the uri path (real name - not with parameter regex)
     * @type {string}
     */
    name: string;
    /**
     * An object to represent the query parameters of a uri path
     * @type {object | undefined}
     */
    query: object | undefined;
    /**
     * Any parameters parsed from the uri path via the given parameter regex
     * @type {object | undefined}
     */
    params: object | undefined;
    /**
     * Any hash parsed from the uri path
     * @type {string | undefined}
     */
    hash: string | undefined;

    /**
     * Constructor to instantiate a RouteResult Object.
     * @param {string} name - The name of the path
     * @param {object} query - The query parameters from the path
     * @param {object} params - The path parameters gotten
     * @param {string} hash - The hash from the path
     */
    constructor(name: string, query?: object, params?: object, hash?: string) {
        this.name = name;
        this.query = query;
        this.params = params;
        this.hash = hash;
    }
}

/**
 * TODO: Implement this class.
 * This class is not for use yet.
 */
export class RouteRequest {
    status: number;
    headers: object | undefined;
    body: JSON | undefined;
    error: string | undefined;

    constructor(status: number, headers?: object, body?: JSON, error?: string) {
        this.status = status;
        this.headers = headers;
        this.body = body;
        this.error = error;
    }
}
function extractIdFromPath(path, regExp, origPath) {
    const match = regExp.exec(path);
    const parts = origPath.split('/').map((part)=>{
        if (part.startsWith(':')) {
            return part.replace(':', '');
        } else {
            return null;
        }
    }).filter((item)=>item !== null);
    if (match && match.length > 1) {
        const output = {};
        for(let index = 0; index < parts.length && index < match.length - 1; index++){
            output[parts[index]] = match[index + 1];
        }
        return output;
    } else {
        return null;
    }
}
function createRegExpFromPath(path) {
    const parts = path.split('/').map((part)=>{
        if (part.startsWith(':')) {
            return `([^/]+)`;
        } else {
            return part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        }
    });
    const regExpString = `^${parts.join('/')}\/?$`;
    return new RegExp(regExpString);
}
function getRouteRequest(window1, uri, pathregex) {
    const url = new URL(window1.location.href);
    const searchParams = url.searchParams;
    const query = {};
    searchParams.forEach((value, key)=>{
        query[key] = value;
    });
    const params = extractIdFromPath(url.pathname, pathregex, uri);
    return {
        name: window1.location.pathname,
        query: query,
        params: params == null ? undefined : params,
        hash: url.hash
    };
}
class Router {
    routes;
    constructor(){
        this.routes = [];
    }
    get(uri, callback) {
        if (!uri || !callback) throw new Error('uri or callback must be given');
        if (typeof uri !== "string") throw new Error('typeof uri must be a string');
        if (typeof callback !== "function") throw new TypeError('typeof callback must be a function');
        this.routes.forEach((route)=>{
            if (route.uri === uri) throw new Error(`the uri ${route.uri} already exists`);
        });
        const route = {
            uri,
            callback
        };
        this.routes.push(route);
    }
    init() {
        this.routes.some((route)=>{
            const regEx = createRegExpFromPath(route.uri);
            const path = window.location.pathname;
            if (path.match(regEx)) {
                const state = getRouteRequest(window, route.uri, regEx);
                return route.callback.call(this, state);
            }
        });
    }
}
window.Router = Router;
export { Router as Router };

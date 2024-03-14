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
    initialRoute;
    constructor(initialRoute = '/'){
        this.routes = [];
        this.initialRoute = initialRoute;
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
        if (this.routes.find((r)=>r.uri === '/') === undefined) {
            this.routes.push({
                uri: '/',
                callback: (_)=>null
            });
        }
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
function getState(event) {
    return event.state ?? history.state;
}
function initState(uri, state = {}) {
    history.replaceState(state, null, uri);
}
class SPARouter {
    routes;
    initialRoute;
    constructor(initialRoute = '/'){
        this.routes = [];
        this.initialRoute = initialRoute;
        initState(initialRoute);
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
        if (this.routes.find((r)=>r.uri === '/') === undefined) {
            this.routes.push({
                uri: '/',
                callback: (_)=>null
            });
        }
        addEventListener('popstate', (event)=>{
            const histstate = getState(event);
            const state = Object.create(histstate, {
                details: {
                    value: {},
                    writable: false
                }
            });
            this.routes.some((route)=>{
                const regEx = createRegExpFromPath(route.uri);
                const path = window.location.pathname;
                if (path.match(regEx)) {
                    const req = getRouteRequest(window, route.uri, regEx);
                    return route.callback.call(this, req, state);
                }
            });
        });
        addEventListener('pushstate', (event)=>{
            const histstate = getState(event);
            const state = Object.create(histstate, {
                details: {
                    value: event.detail ?? {},
                    writable: false
                }
            });
            this.routes.some((route)=>{
                const regEx = createRegExpFromPath(route.uri);
                const path = window.location.pathname;
                if (path.match(regEx)) {
                    const req = getRouteRequest(window, route.uri, regEx);
                    return route.callback.call(this, req, state);
                }
            });
        });
    }
}
const pushEvent = new CustomEvent('pushstate');
function navigateTo(uri, state = {}, details) {
    let event = pushEvent;
    if (details) {
        event = new CustomEvent('pushstate', {
            detail: details ?? {}
        });
    }
    history.pushState(state, null, uri);
    dispatchEvent(event);
}
function navigateBack() {
    history.back();
}
Object.assign(window, {
    Router: Router,
    SPARouter: SPARouter,
    navigateTo: navigateTo,
    navigateBack: navigateBack,
    pushEvent: pushEvent
});
export { Router as Router, SPARouter as SPARouter, navigateBack as navigateBack, navigateTo as navigateTo, pushEvent as pushEvent };

export class RouteResult {
    name: string;
    query: object | undefined;
    params: object | undefined;
    hash: string | undefined;

    constructor(name: string, query?: object, params?: object, hash?: string) {
        this.name = name;
        this.query = query;
        this.params = params;
        this.hash = hash;
    }
}

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
export class Router {
    constructor(initialRoute?: string);
    routes: any[];
    initialRoute: string;
    get(uri: any, callback: any): void;
    init(): void;
}
export class SPARouter {
    constructor(initialRoute?: string);
    routes: any[];
    initialRoute: string;
    get(uri: any, callback: any): void;
    init(): void;
}
export function navigateBack(): void;
export function navigateTo(uri: any, state: {}, details: any): void;
export const pushEvent: CustomEvent<any>;

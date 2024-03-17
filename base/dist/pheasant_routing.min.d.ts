declare class l {
    constructor(t?: string);
    routes: any[];
    initialRoute: string;
    get(t: any, e: any): void;
    init(): void;
}
declare class f {
    constructor(t?: string);
    routes: any[];
    initialRoute: string;
    get(t: any, e: any): void;
    init(): void;
}
declare function m(): void;
declare function w(a: any, t: {}, e: any): void;
declare const h: CustomEvent<any>;
export { l as Router, f as SPARouter, m as navigateBack, w as navigateTo, h as pushEvent };

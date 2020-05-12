declare class Core {
    static instanceRequestInterceptors: any;
    static instanceResponseInterceptors: any;
    [x: string]: any;
    instanceRequestInterceptors: any[];
    instanceResponseInterceptors: any[];
    constructor(initOptions: any);
    static requestInterceptors: any[];
    static responseInterceptors: any[];
    static requestUse(handler: any, opt?: {
        global: boolean;
    }): void;
    static responseUse(handler: any, opt?: {
        global: boolean;
    }): void;
    use(newMiddleware: any, opt?: {
        global: boolean;
        core: boolean;
    }): this;
    extendOptions(options: any): void;
    dealRequestInterceptors(ctx: any): any;
    request(url: any, options: any): Promise<unknown>;
}
export default Core;

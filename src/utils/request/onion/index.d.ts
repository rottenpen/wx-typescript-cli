declare class Onion {
    [x: string]: any;
    constructor(defaultMiddlewares: any);
    static globalMiddlewares: any[];
    static defaultGlobalMiddlewaresLength: number;
    static coreMiddlewares: any[];
    static defaultCoreMiddlewaresLength: number;
    use(newMiddleware: any, opts?: {
        global: boolean;
        core: boolean;
        defaultInstance: boolean;
    }): void;
    execute(params?: any): Promise<any>;
}
export default Onion;

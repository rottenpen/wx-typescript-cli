declare function compose(middlewares: any): (params: any, next?: any) => Promise<any>;
export default compose;

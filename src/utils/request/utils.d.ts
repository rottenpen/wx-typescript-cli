export declare class MapCache {
    cache: any;
    timer: any;
    maxCache: any;
    constructor(options: any);
    extendOptions(options: any): void;
    get(key: any): any;
    set(key: any, value: any, ttl?: number): void;
    delete(key: any): any;
    clear(): any;
}
/**
 * 请求异常
 */
export declare class RequestError extends Error {
    request: any;
    type: any;
    constructor(text: any, request: any, type?: string);
}
/**
 * 响应异常
 */
export declare class ResponseError extends Error {
    data: any;
    response: any;
    request: any;
    type: any;
    constructor(response: any, text: any, data: any, request: any, type?: string);
}
/**
 * http://gitlab.alipay-inc.com/KBSJ/gxt/blob/release_gxt_S8928905_20180531/src/util/request.js#L63
 * 支持gbk
 */
/**
 * 安全的JSON.parse
 */
export declare function safeJsonParse(data: any, throwErrIfParseFail?: boolean, response?: any, request?: any): any;
export declare function timeout2Throw(msec: any, request: any): Promise<unknown>;
export declare function cancel2Throw(opt: any): Promise<unknown>;
export declare function isArray(val: any): boolean;
export declare function isDate(val: any): boolean;
export declare function isObject(val: any): boolean;
export declare function forEach2ObjArr(target: any, callback: any): void;
export declare function getParamObject(val: any): any;
export declare function reqStringify(val: any): any;
export declare function mergeRequestOptions(options: any, options2Merge: any): any;

import { wxAbort } from './wxfetch';
interface Methods {
    get?: any;
    post?: any;
    delete?: any;
    put?: any;
    patch?: any;
    head?: any;
    options?: any;
    rpc?: any;
    use?: any;
    fetchIndex: any;
    interceptors: any;
    Cancel: any;
    CancelToken: any;
    isCancel: any;
    extendOptions: any;
    middlewares: any;
    (url: string, options: Object): any;
}
/**
 * extend 方法参考了ky, 让用户可以定制配置.
 * initOpions 初始化参数
 * @param {number} maxCache 最大缓存数
 * @param {string} prefix url前缀
 * @param {function} errorHandler 统一错误处理方法
 * @param {object} headers 统一的headers
 */
export declare const extend: (initOptions: any) => Methods;
/**
 * 暴露 fetch 中间件，保障依旧可以使用
 */
export declare const fetch: Methods;
/**
 * 暴露 abort 方法
 * 需要在 options 里加入 abortToken 用于 abort 掉对应的 requestTask
 */
export declare const abort: typeof wxAbort;
declare const _default: Methods;
export default _default;

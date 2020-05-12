import Core from './core';
import Cancel from './cancel/cancel';
import CancelToken from './cancel/cancelToken';
import isCancel from './cancel/isCancel';
import Oinon from './onion';
import { getParamObject, mergeRequestOptions } from './utils';
import { wxAbort } from './wxfetch';

interface Methods {
  get?: any
  post?: any
  delete?: any
  put?: any
  patch?: any
  head?: any
  options?: any
  rpc?: any
  use?: any
  fetchIndex: any
  interceptors: any
  Cancel: any
  CancelToken: any
  isCancel: any
  extendOptions: any
  middlewares: any
  (url: string, options: Object): any
}
// 通过 request 函数，在 core 之上再封装一层，提供原 wx/request 一致的 api，无缝升级
const request = (initOptions = {}) => {
  const coreInstance = new Core(initOptions);
  const wxInstance:Methods = (url, options = {}) => {
    const mergeOptions = mergeRequestOptions(coreInstance.initOptions, options);
    return coreInstance.request(url, mergeOptions);
  };

  // 中间件
  wxInstance.use = coreInstance.use.bind(coreInstance);
  wxInstance.fetchIndex = coreInstance.fetchIndex;

  // 拦截器
  wxInstance.interceptors = {
    request: {
      use: Core.requestUse.bind(coreInstance),
    },
    response: {
      use: Core.responseUse.bind(coreInstance),
    },
  };

  // 请求语法糖： reguest.get request.post ……
  const METHODS = ['get', 'post', 'delete', 'put', 'patch', 'head', 'options', 'rpc'];
  METHODS.forEach(method => {
    wxInstance[method] = (url, options) => wxInstance(url, { ...options, method });
  });

  wxInstance.Cancel = Cancel;
  wxInstance.CancelToken = CancelToken;
  wxInstance.isCancel = isCancel;

  wxInstance.extendOptions = coreInstance.extendOptions.bind(coreInstance);

  // 暴露各个实例的中间件，供开发者自由组合
  wxInstance.middlewares = {
    instance: coreInstance.onion.middlewares,
    defaultInstance: coreInstance.onion.defaultMiddlewares,
    global: Oinon.globalMiddlewares,
    core: Oinon.coreMiddlewares,
  };

  return wxInstance;
};

/**
 * extend 方法参考了ky, 让用户可以定制配置.
 * initOpions 初始化参数
 * @param {number} maxCache 最大缓存数
 * @param {string} prefix url前缀
 * @param {function} errorHandler 统一错误处理方法
 * @param {object} headers 统一的headers
 */
export const extend = initOptions => request(initOptions);

/**
 * 暴露 fetch 中间件，保障依旧可以使用
 */
export const fetch = request({ parseResponse: false });
/**
 * 暴露 abort 方法
 * 需要在 options 里加入 abortToken 用于 abort 掉对应的 requestTask
 */
export const abort = wxAbort
export default request({});

/**
 * 通过 CancelToken 来取消请求操作
 *
 * @class
 * @param {Function} executor The executor function.
 */
declare function CancelToken(executor: any): void;
declare namespace CancelToken {
    var source: () => {
        token: any;
        cancel: any;
    };
}
export default CancelToken;

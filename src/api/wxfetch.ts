import { extend } from '@/utils/request/request';
const errorHandler = function (error) {
  const codeMap = {
    '-1': '发生错误啦',
  };
  if (error.response) {
    console.log(error.response.status);
    console.log(error.response.headers);
    console.log(error.data);
    console.log(error.request);
    console.log(codeMap[error.data.status])
  } else {
    console.log(error.message);
  }
  throw error;
}
/** 创建实例 */
function createRequest(baseUrl) {
  const request = extend({
    prefix: baseUrl,
    errorHandler
  });
  return request;
}

let ajax:any = createRequest('http://localhost:3000')
/** request拦截器 */
ajax.interceptors.request.use((url, options) => {
  return (
    {
      url: `${url}`,
      options: { ...options, interceptors: true },
    }
  )
})
/** response拦截器 */
ajax.interceptors.response.use((res, req) => {
  return res.data
})
export default ajax
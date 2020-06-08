let requestTask = {}
export function wxAbort(token) {
  requestTask[token].abort()
}
export default function wxFetch(
  url,
  options,
) {
  let keys = ['url', 'data', 'header', 'timeout', 'method', 'dataType', 'responseType', 'enableHttp2', 'enableQuic', 'enableCache', 'complete']
  // let arr = Object.keys(options)
  let obj = {}
  keys.forEach(ele => {
    options[ele] && (obj[ele] = options[ele])
  })
  obj['url'] = url
  if (!obj['header']) obj['header'] = { 'Content-Type': 'application/json' }
  return new Promise((resolve, reject) => {
    let task = wx.request({
      url,
      ...obj,
      success(res) {
        resolve(res)
      },
      fail(err) {
        reject({
          msg: '请求失败',
          url,
          method: options.method,
          data: err
        })
      }
    })
    if (options.cancelToken) {
      options.cancelToken.promise.then(function onCanceled(cancel) {
        if (!task) {
          return task
        }
        task.abort()
        reject(cancel)
        task = null
      })
    }
    if (options['abortToken']) {
      requestTask[options['abortToken']] = task
    }
  })
}
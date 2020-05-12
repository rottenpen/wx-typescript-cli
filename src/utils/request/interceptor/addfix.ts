
interface Options {
  prefix?: string
  suffix?: string
}
interface ReturnOptions {
  url?: string
  options?: Options
}
// 前后缀拦截
const addfix = (url, options:Options = {}):ReturnOptions => {
  const { prefix, suffix } = options
  if (prefix) {
    url = `${prefix}${url}`
  }
  if (suffix) {
    url = `${url}${suffix}`
  }
  return {
    url,
    options
  }
}

export default addfix
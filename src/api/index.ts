import ajax from "./wxfetch";

export function getHotCity(options) {
  const url = '/location/hot_city'
  return ajax.get(url, options)
}

export function postSearch(options) {
  const url = '/airshop/search'
  return ajax.post(url, options)
}

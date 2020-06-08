// TODO：考虑可能遇到的更多问题，支持 option 对 loader 进行拓展
import { resolve, basename, isAbsolute, relative, dirname, join } from 'path';
import { getOptions } from 'loader-utils';
import { transform } from "./transform";
import { generate } from "./generate";

const compiler = require('./wx-template-compiler')
// import { isString, transform } from "lodash";
// import { baseParse } from "./parse";

exports.default = function (source) {
  const loaderContext = this
  const {
    target,
    request,
    minimize,
    sourceMap,
    rootContext,
    resourcePath,
    resourceQuery
  } = loaderContext
  const context = rootContext || process.cwd()
  const sourceRoot = dirname(relative(context, resourcePath))
  
  // 缓存 loader 转换后的内容，以此提速
  this.cacheable && this.cacheable()
  // 告诉 loader - runner 这个 loader 将会异步调用
  const callback = this.async()
  // 获得 options
  const options = getOptions(this) || {}
  const {ast} = compiler.compile(`<template>${source}</template>`)
  transform(ast.children)
  let s = generate(ast.children)
  try {
    callback(null, s)
  } catch (error) {
    callback('error', source)
  }
  
}
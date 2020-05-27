import sax from "sax";
import { resolve, basename, isAbsolute, relative, dirname, join } from 'path';
import { getOptions } from 'loader-utils';
const { parse } = require('@vue/component-compiler-utils')

const ROOT_TAG_NAME = 'xxx-wxml-root-xxx';
const ROOT_TAG_START = `<${ROOT_TAG_NAME}>`;
const ROOT_TAG_END = `</${ROOT_TAG_NAME}>`;
const ROOT_TAG_LENGTH = ROOT_TAG_START.length;

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
  function loadTemplateCompiler (loaderContext) {
    try {
      return require('vue-template-compiler')
    } catch (e) {
      if (/version mismatch/.test(e.toString())) {
        loaderContext.emitError(e)
      } else {
        loaderContext.emitError(new Error(
          `[vue-loader] vue-template-compiler must be installed as a peer dependency, ` +
          `or a compatible compiler implementation must be passed via options.`
        ))
      }
    }
  }
  const descriptor = parse({
    source,
    compiler: loadTemplateCompiler(loaderContext),
    filename: basename(resourcePath),
    sourceRoot,
    needMap: sourceMap
  })
  console.log(descriptor)
  // return source
  try {
    callback(null, source)
    
  } catch (error) {
    callback('error', source)
  }
  
}
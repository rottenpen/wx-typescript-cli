import sax from "sax";
import { resolve, basename, isAbsolute, relative, dirname, join } from 'path';
import { getOptions } from 'loader-utils';
import { SimpleHtmlParser } from './htmlTokenizer'
import { parseToVnode } from './parse'

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
  const ast = (new SimpleHtmlParser())
  ast.parse(source)
  // 通过 SimpleHtmlParser 生成的 token 进行 parse 处理
  const token = ast.contentHandler._sb
  console.log(parseToVnode(token))
  
  // return source
  try {
    callback(null, source)
    
  } catch (error) {
    callback('error', source)
  }
  
}
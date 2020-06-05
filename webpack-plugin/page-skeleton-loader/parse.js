// 字符转译
const decodeRe = /&(gt|lt|amp|apos|quot);/g
const decodeMap = {
  gt: '>',
  lt: '<',
  amp: '&',
  apos: "'",
  quot: '"'
}
const NodeTypes = {
  ROOT = 'ROOT',
  ELEMENT = 'ELEMENT',
  TEXT = 'TEXT',
  COMMENT = 'COMMENT',
  SIMPLE_EXPRESSION = 'SIMPLE_EXPRESSION',
  INTERPOLATION = 'INTERPOLATION',
  ATTRIBUTE = 'ATTRIBUTE',
  DIRECTIVE = 'DIRECTIVE',
  // containers
  COMPOUND_EXPRESSION = 'COMPOUND_EXPRESSION',
  IF = 'IF',
  IF_BRANCH = 'IF_BRANCH',
  FOR = 'FOR',
  TEXT_CALL = 'TEXT_CALL',
  // codegen
  VNODE_CALL = 'VNODE_CALL',
  JS_CALL_EXPRESSION = 'JS_CALL_EXPRESSION',
  JS_OBJECT_EXPRESSION = 'JS_OBJECT_EXPRESSION',
  JS_PROPERTY = 'JS_PROPERTY',
  JS_ARRAY_EXPRESSION = 'JS_ARRAY_EXPRESSION',
  JS_FUNCTION_EXPRESSION = 'JS_FUNCTION_EXPRESSION',
  JS_CONDITIONAL_EXPRESSION = 'JS_CONDITIONAL_EXPRESSION',
  JS_CACHE_EXPRESSION = 'JS_CACHE_EXPRESSION',
  // ssr codegen
  JS_BLOCK_STATEMENT = 'JS_BLOCK_STATEMENT',
  JS_TEMPLATE_LITERAL = 'JS_TEMPLATE_LITERAL',
  JS_IF_STATEMENT = 'JS_IF_STATEMENT',
  JS_ASSIGNMENT_EXPRESSION = 'JS_ASSIGNMENT_EXPRESSION',
  JS_SEQUENCE_EXPRESSION = 'JS_SEQUENCE_EXPRESSION',
  JS_RETURN_STATEMENT = 'JS_RETURN_STATEMENT'
}
const TextModes = {
  DATA: 0, // 正常的元素
  RCDATA: 1, // <textarea>
  RAWTEXT: 2, // <style>,<script> 小程序里用于 <wxs>
  CDATA: 3,
  ATTRIBUTE_VALUE: 4
}
const Namespaces = {
  HTML: 0
}
const NO = () => false
export const defaultParserOptions = {
  delimiters: [`{{`, `}}`],
  getNamespace: () => Namespaces.HTML,
  getTextMode: () => TextModes.DATA,
  isVoidTag: NO,
  isPreTag: NO,
  isCustomElement: NO,
  decodeEntities: (rawText) =>
    rawText.replace(decodeRE, (_, p1) => decodeMap[p1]),
  onError: defaultOnError
}

export function baseParse(content, options = {}) {
  const context = createParseContext(content, options)
  const start = getCursor(context)
  return creatRoot(
    parseChildren(context, TextModes.DATA, []),
    getSelection(context, start)
  )
}
function createParseContext(context, options) {
  return {
    options: {
      ...defaultParseOptions,
      ...options
    },
    column: 1,
    line: 1,
    offset: 0,
    originalSource: context,
    source: content,
    inPre: false,
    inVPre: false
  }
}
function creatRoot(params) {
  
}

function parseChildren(context, mode, ancestors) {
  const parent = last(ancestors)
  const ns = parent ? parent.ns : Namespaces.HTML
  const nodes = []

  while (!isEnd(context, mode, ancestors)) {

  }

  let removedWhitespace = false
  if (mode !== TextModes.RAWTEXT) {
    if (!context.inPre) {

    } else if (parent && context.options.isPreTag(parent.tag)) {
      // 根据规范删掉前导换行符
      const first = nodes[0]
      if (first && first.type === NodeTypes.TEXT) {
        first.content = first.content.replace(/^\r?\n/, '')
      }
    }
  }

  return removedWhitespace ? nodes.filter(Boolean) : nodes
}

function parseElement(context, ancestors) {
  // Start tag
  const wasInPre = context.inPre
  const wasInVPre = context.inVPre
}
/**
 * 格式化字段和起始点对象
 * @param {*} context 
 * @param {*} start 
 * @param {*} end 
 */
function getSelection(context, start, end) {
  end = end || getCursor(context)
  return {
    start,
    end,
    source: context.originalSource.slice(start.offset, end.offset)
  }
}

function isEnd(context, mode, ancestors) {
  const s = context.source

  switch (mode) {
    case TextModes.DATA:
      if (startsWith(s, '</')) {
        //TODO: probably bad performance
        for (let i = ancestors.length - 1; i >= 0; --i) {
          if (startsWithEndTagOpen(s, ancestors[i].tag)) {
            return true
          }
        }
      }
      break

      case TextModes.RCDATA:
      case TextModes.RAWTEXT: {
        const parent = last(ancestors)
        if (parent && startsWithEndTagOpen(s, parent.tag)) {
          return true
        }
        break
      }

      case TextModes.CDATA:
        if (startsWith(s, ']]>')) {
          return true
        }
        break
      
      default:
        break
  }

  return !s
}
function startsWith(source, searchString) {
  return source.startsWith(searchString)
}
function startsWithEndTagOpen(source, tag) {
  return (
    startsWith(source, '</') &&
    source.substr(2, tag.length).toLowerCase() === tag.toLowerCase() &&
    /[\t\n\f />]/.test(source[2 + tag.length] || '>')
  )
}
/**
 * 用来过滤属性，返回字符对应行数
 * @context {*} ParseContext
 */
function getCursor(context) {
  const {column, line, offset} = context
  return {column, line, offset}
}
function last(arr) {
  return arr[arr.length - 1]
}
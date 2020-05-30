// for script (e.g. type="x/template") or style, do not decode content
function isTextTag (el) {
  return el.tag === 'script' || el.tag === 'style'
}
function makeAttrsMap (attrs) {
  const map = {}
  for (let i = 0, l = attrs.length; i < l; i++) {
    map[attrs[i].name] = attrs[i].value
  }
  return map
}
/**
 * 生成 AST 元素
 * @param {string} tag 
 * @param {Array<ASTAttr>} attrs 
 * @param {ASTElement} parent
 */
export function createASTElement(tag, attrs, parent) {
  return {
    type: 1,
    tag,
    attrsList: attrs,
    attrsMap: makeAttrsMap(attrs),
    rawAttrsMap: {},
    parent,
    children: []
  }
  
}
function vnode(tag, key, props = {}, children, text) {
  return {
    tag, key, props, children, text
  }
}
/**
 * 将 token 转化为虚拟 dom
 * @param { Array<string> } tokens 
 */
export function parseToVnode(tokens) {
  let root = vnode('', undefined, {}, [], '')
  let i = 0
  tokens = tokens.map(ele => ele.trim())
  console.log(tokens.length)
  while (i < tokens.length) {
    if(tokens[i] && tokens[i][0] == '<') {
      // ‘</’ 的时候确定为 endTag
      if(tokens[i][1] == '/') {}
      // 其他情况判断为 startTag
      else {
        let tag = tokens[i].slice(1)
        // 这样写会导致重复的 prop 会被后者覆盖
        let props = {}
        let hasChildren = true
        let children = []
        let text = ''
        i++
        while(tokens[i] !== '>' && i < tokens.length) {
          // 判断是否有 =, 且 = 不能是第一个
          if(tokens[i].indexOf('=') > 0) {
            let index = tokens[i].indexOf('=')
            let key = tokens.slice(0, index)
            let value = tokens.slice(index + 1)
            props[key] = value
          } else if (tokens[i] === '/') {
            if(tokens[i + 1] === '>') hasChildren = false
          } else {
            props[tokens[i]] = undefined
          }
          // TODO: 分词函数有bug 会在👉 ""/> 的时候把 / 忽略掉，所以要写成 "" />
          // 但是 sky/> 的时候只会分成 ['sky/', '>']

          // 如果 hasChildren true 的话，indexOf 找到下一个 endTag，之间的元素递归，如果没就赋值false
          
          i++
        }
        // console.log('-=--', tokens[i])
        i++
        if (tag === 'wxs') {
          let endIndex = tokens.indexOf(`</${tag}>`)
          if(endIndex > i) {
            // console.log(tokens.slice(i, endIndex), tokens.slice(i, endIndex).reduce((sum, ele) => sum + ele, ''))
            // children.push(vnode(undefined, undefined, props = {}, children, tokens.slice(i, endIndex).reduce((sum, ele) => sum + ele, '')))
            // children = parseToVnode(tokens.slice(i, endIndex)).children
            text = tokens.slice(i, endIndex).reduce((sum, ele) => sum + ele, '')
            i = endIndex
          }
        } else if (hasChildren) {
          console.log(tag)
          let endIndex = tokens.indexOf(`</${tag}>`)
          if(endIndex > i) {
            // console.log(tokens.slice(i + 1, endIndex))
            children = parseToVnode(tokens.slice(i, endIndex)).children
            i = endIndex
          }
        }
        
        root.children.push(vnode(tag, undefined, props, children, text))
        console.log('ch:', root.children)
        i++
        console.log('i:', i)
      }
    } else {
      let text = ''
      while (i < tokens.length && tokens[i][0] !== '<' ) {
        text += tokens[i]
        i++
      }
      let child = vnode(undefined, undefined, {}, [], text)
      text.length > 0 && root.children.push(child)
      // console.log('i:', i)
    }
  }
  return root
}
const generate = function(astGroup) {
  let s = ''
  for(let i in astGroup) {
    // let cur = ''
    let node = astGroup[i]
    console.log(node)
    if(node.type === 3) {
      s += node.text + '\n'
    } else {
      let startTag = `<${node.tag}`
      let attr = Object.keys(node.attrsMap).reduce((s, key) => {
        return s += node.attrsMap[key] ? ` ${key}="${node.attrsMap[key]}"` : ` ${key}`
      }, '')
      let child = generate(node.children)
      let endTag = `</${node.tag}>\n`
      s += `${startTag}${attr}>\n${child}${endTag}`
    }
  }
  return s
}

exports.generate = generate
// 遍历一遍一遍结构，然后把新生成的骨架屏 ast push 到 template.children 后
// TODO: 异常处理，允许通过 options 修改 component 的名称
let skeletonRoot
exports.transform = function (nodeGroup) {
  dfs(nodeGroup)
  if(skeletonRoot) {
    nodeGroup.push(skeletonRoot)
  }
  return nodeGroup
}
function dfs(nodeGroup) {
  for(let i in nodeGroup) {
    let node = nodeGroup[i]
    if(node.type === 3 || node.tag === 'wxs') {
      continue;
    }
    if(node.type === 1) {
      if(node.attrsMap && node.attrsMap.hasOwnProperty('skeleton-root')) {
        skeletonRoot = Object.assign({}, node, {
          type: 1,
          tag: 'skeleton',
          parent: [],
          children: [],
        })
        skeletonRoot.attrsMap = Object.assign({}, skeletonRoot.attrsMap)
        skeletonRoot.attrsMap['wx:if'] = '{{skeletonShow}}'
        dfsSkeletonItem(node.children, skeletonRoot)
      }
    }
  }
}
function dfsSkeletonItem(nodeGroup, parent) {
  for(let i in nodeGroup) {
    let node = nodeGroup[i]
    if(node.type === 3 || node.tag === 'wxs') {
      continue;
    }
    if(node.attrsMap && node.attrsMap.hasOwnProperty('skeleton')) {
      let newNode = Object.assign({}, node, {
        tag: 'skeleton-item',
        children: [],
        parent: []
      })
      parent.children.push(newNode)
      continue
    }
    if(node.attrsMap.hasOwnProperty('skeleton-group')) {
      let group = Object.assign(
        {}, node,{
          children: [],
          tag: 'skeleton-group',
          parent: []
        }
      )
      dfsSkeletonItem(node.children, group)
      parent.children.push(group)
      continue
    }
  }
}
# page-skeleton-loader

一个自动化生成小程序骨架屏的 webpack loader

## 有什么用

能够根据关键字，自动生成对应的组件。

- skeleton-root 生成根节点元素 `<skeleton></skeleton>` 会在首页生成一个满屏的遮罩层，用来做骨架屏的容器
- skeleton-group 生成用来封装组元素的 `<skeleton-group></skeleton-group>`
- skeleton 生成最低粒度的骨架屏元素 `<skeleton-item></skeleton-item>`

## TODO

- [x]支持 options 对 loader 拓展
- [x]补充异常边际处理

# 把 WXML source 转成 AST

- fork from [vue-template-compiler](https://github.com/vuejs/vue/tree/dev/packages/vue-template-compiler),修改了里面部分 tag 类型，首先判断是否是 WX 的 tag。对 wxs 进行了额外处理。

## 为什么用 vue-template-compiler 而不使用 vue3 的 complier-core

- 因为 compiler-core 不光包括了 compiler 的功能，还包括一些像 transform 那样的功能，而且 compiler-core 有用到 @vue/share，@babel/parser 等其他依赖。在 vue-template-compiler 能解决问题的情况下没必要使用这么大的包。
- compiler-core 生成的 AST 节点会把 directives 另外抽出来，加大了我在写 gen 的时候的工作量。so...

## 为什么不自己写一个

- 写过一个版本，太多 bug 了 :)

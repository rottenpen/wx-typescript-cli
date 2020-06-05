# 把 WXML source 转成 AST

fork from [vue-template-compiler](https://github.com/vuejs/vue/tree/dev/packages/vue-template-compiler),修改了里面部分 tag 类型，首先判断是否是 WX 的 tag。对 wxs 进行了额外处理。

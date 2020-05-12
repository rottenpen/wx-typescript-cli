# wx-typescript-cli
一个 TypeScript 的小程序脚手架。享受近乎原生的开发体验（少坑/有坑也是微信的锅）。

## Supported features
- 引入依赖
- 支持 TypeScript 以及 es-next 语法
- 支持在 wxss 里使用 less
- 支持类 axios 的网络请求开发体验
- 较为完善的 wx/types

## Class Page

为了更好感受 TS 带来的开发体验，对 Page 开发进行魔改。（慎入！）
- 需要继承 Page 的基类，来获得 type 的支持。
- 需要通过全局的 component 工厂函数装饰 Class。
- 可以在工厂函数中对 Class 进行处理，从而实现 Mixin 的效果。

``` TypeScript
// templatePage.ts
import { TmgPage } from "@/page";

interface IndexPageData {
  list? : any[]
}

const com = global['__Component']
@com()
class TemplatePage extends TmgPage{
  public data: IndexPageData = {
    list: []
  }
  public onLoad(options) {
  }
}
```

tips: 
需要工厂函数修饰类，是因为小程序规定 page 不能传入带有构造函数的对象，所以需要对 class 进行预处理。但是这样的同时也带来了一定好处，我们可以在工厂函数对 options 对象进行 Mixin。

## MiniProgram Types
较为齐全的小程序 Types 支持（持续更新中！）

## request
为 TypeScript 的小程序封装了一个类 axios 的库（基于 umi-request）
### Supported features
- url 参数自动序列化
- post 数据提交方式简化
- response 返回处理简化
- api 超时支持
- api 请求缓存支持
- 支持处理 gbk
- 类 axios 的 request 和 response 拦截器(interceptors)支持
- 统一的错误处理方式
- 类 koa 洋葱机制的 use 中间件机制支持
- 类 axios 的取消请求
- 基于 requestTask.Abort() 的取消请求

## Thanks
wx-request 灵感来自(umi-request)[https://github.com/umijs/umi-request]
小程序文件处理 plugin 灵感来自(wxapp-webpack-plugin)[https://github.com/Cap32/wxapp-webpack-plugin]

## Code Contributors
@rottenpen
@XLinzexin

## LICENSE
MIT
# wx-request
一个类 axios 的小程序请求库
api 基本与 umi-request 一致👇
fork from [umi-request](https://github.com/umijs/umi-request)

## 类 axios api 的实现

## abort
wx-request 可以通过植入 token 的方式，找到请求队列里对应的 RequestTask，并通过小程序的 [abort api](https://developers.weixin.qq.com/miniprogram/dev/api/network/request/RequestTask.abort.html) 对其进行 Abort。
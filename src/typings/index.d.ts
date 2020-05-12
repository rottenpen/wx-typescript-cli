/*! *****************************************************************************
Copyright (c) 2018 Tencent, Inc. All rights reserved. 

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
***************************************************************************** */

/// <reference path="./lib.wa.es6.d.ts" />
/// <reference path="./wx/index.d.ts" />

// declare class TmgPage {
//   public setData: (obj: any, cb?: () => void) => void
//   public readonly __proto__: any
// }
interface WXTarget {
  id: string;
  dataset: any;
  offsetLeft: number;
  offsetTop: number;
}

/** 微信绑定事件的回调 */
interface WXEvent {
  /** 点击事件 详情 */
  detail: any;
  currentTarget: WXTarget;
  target: WXTarget;
  type?: string;
  timeStamp?: number;
  touches?: any[];
}
// eslint-disable-next-line
interface global {
  /** 实际上并不存在 URLSearchParams */
  URLSearchParams? :any,
  __Component: <S>(options?: any) => any;
}
// eslint-disable-next-line
interface window {
  /** 实际上并不存在 URLSearchParams */
  URLSearchParams? :any,
}
declare const window: window;
declare const global: global;
// export = TmgPage;
// eslint-disable-next-line @typescript-eslint/class-name-casing
interface __wxConfig {
  page: any;
}

declare const __wxConfig;
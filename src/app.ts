/*
 * @Author: rotten 
 * @Date: 2019-07-30 16:53:23 
 * @Last Modified by: rotten
 * @Last Modified time: 2020-05-12 10:29:00
 */

import { Component, View } from "@/lib/class-component/page";
Object.assign(global, { __Component: Component }) // 把处理page的工厂函数塞到 global 里，便于全局使用

App({
  onLaunch (options): void{
    // 展示本地存储能力
    console.log(Component)
    wx.getSystemInfo({
      success (res): void {
        console.log(res)
      }
    })
  },
  globalData: {
    userInfo: undefined,
    language: 1, // 1为中文 2为英文 默认为中文
    start: {},
    end: {},
    startDate: '',
    endDate: '',
    // selectDate: []
  }
})

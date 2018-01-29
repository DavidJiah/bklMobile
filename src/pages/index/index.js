import Vue from 'vue'
import App from './App'
import FastClick from 'fastclick'
import * as filters from '@/filters'
import 'lib-flexible'
import wx from 'weixin-js-sdk'
import { getJsapiSignature } from '@/api'
import 'babel-polyfill'
require('es6-promise').polyfill()

Vue.config.productionTip = false

Vue.prototype.hiddenWxMenu = function() {
  getJsapiSignature(document.location.href).then(res => {
    var data = res.data.data;
    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作
    wx.config({
      debug: false, // 开启调试模式,开发时可以开启  
      appId: data.appId, // 必填，公众号的唯一标识   由接口返回
      timestamp: data.timestamp, // 必填，生成签名的时间戳 由接口返回
      nonceStr: data.nonceStr, // 必填，生成签名的随机串 由接口返回
      signature: data.signature, // 必填，签名 由接口返回
      jsApiList: [, 'hideMenuItems'] // 此处填你所用到的方法 
    })
  })
  wx.ready(() => {
    wx.hideMenuItems({
      menuList: ["menuItem:share:appMessage", "menuItem:share:qq",
        "menuItem:share:weiboApp", "menuItem:share:email", "menuItem:favorite","menuItem:openWithSafari",
        "menuItem:share:QZone", "menuItem:openWithQQBrowser", "menuItem:originPage", "menuItem:copyUrl",
        "menuItem:readMode", "menuItem:refresh", "menuItem:share:timeline"
      ] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
    })
  })

}

FastClick.attach(document.body)
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})

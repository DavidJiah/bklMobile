import Vue from 'vue'
import App from './App'
import wx from 'weixin-js-sdk'
import { getJsapiSignature, shareResult } from '@/api'
import { getQueryString } from "@/utils"
import 'lib-flexible'
import 'babel-polyfill'
require('es6-promise').polyfill()

Vue.config.productionTip = false

Vue.prototype.wxShare = function(codeInfo) {
  getJsapiSignature(document.location.href).then(res => {
    var data = res.data.data;
    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作
    wx.config({
      debug: false, // 开启调试模式,开发时可以开启  
      appId: data.appId, // 必填，公众号的唯一标识   由接口返回
      timestamp: data.timestamp, // 必填，生成签名的时间戳 由接口返回
      nonceStr: data.nonceStr, // 必填，生成签名的随机串 由接口返回
      signature: data.signature, // 必填，签名 由接口返回
      jsApiList: ['onMenuShareTimeline', 'hideMenuItems'] // 此处填你所用到的方法 
    })
    this.loading = false
  })

  wx.ready(() => {

    wx.hideMenuItems({
      menuList: ["menuItem:share:appMessage", "menuItem:share:qq",
        "menuItem:share:weiboApp", "menuItem:share:email", "menuItem:favorite",
        "menuItem:share:QZone", "menuItem:openWithQQBrowser",
        "menuItem:openWithSafari", "menuItem:originPage", "menuItem:copyUrl",
        "menuItem:readMode", "menuItem:refresh"
      ] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
    })
    //隐藏菜单
    // 所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，
    // 则可以直接调用，不需要放在ready函数中。
    wx.onMenuShareTimeline({ // 分享朋友圈
      title: codeInfo.vo.adTitle, // 分享标题
      link: 'https://www.ijnkj.com/bkl/mobile/advert.html?activityId=' + codeInfo.activity, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      // link: 'https://ijnkj.mynatapp.cc/advert.html?activityId=' + codeInfo.activity, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: codeInfo.vo.adImg, // 分享图标
      // 用户确认分享后执行的回调函数
      success: function() {
        shareResult(codeInfo.openId, codeInfo.id).then(res => {
          const data = res.data
          if (data.code === 0 && data.msg === "success") {
            location.href = "index.html?state=" + data.data.id + "&openId=" + codeInfo.openId
          } else {
            location.href = "index.html?shareErro=" + data.msg
          }
        })
      },
      // 用户取消分享后执行的回调函数
      cancel: function() {}
    })
  })

}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})

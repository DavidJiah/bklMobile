import Vue from 'vue'
import App from './App'
import wx from 'weixin-js-sdk'
import 'lib-flexible'
import 'babel-polyfill'
require('es6-promise').polyfill()

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
import Vue from 'vue'
import App from './App'
import wx from 'weixin-js-sdk'
import 'lib-flexible'
import 'babel-polyfill'
import AlloyFinger from 'alloyfinger'
import AlloyFingerVue from 'alloyfinger/vue/alloy_finger.vue'
Vue.use(AlloyFingerVue, { AlloyFinger }) 

import * as filters from '@/filters'
require('es6-promise').polyfill()

Vue.config.productionTip = false

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
<template>
  <div class="erro">
    <span>{{detail}}</span>
    <img src="@/assets/erro.png">
  </div>
</template>
<script>
export default {
  props: {
    msg: {
      type: String
    }
  },
  computed: {
    detail() {
      let msg
      switch (this.msg) {
        case 'others_scaned':
          msg = '红包已被他人领取'
          break;
        case 'not_start':
          msg = '活动未开始'
          break;
        case 'over_limit':
          msg = '商家说您不能再扫啦!'
          break;
        case 'customer_lock':
          msg = '请先领取您已拆开的红包!'
          break;
        case 'error_code':
          msg = '本次扫描已过期，请重新扫描！'
          break;
        case 'pay_erro':
          msg = '支付失败!请确认微信是否实名认证'
          break;
        case 'activity_stop':
          msg = '休息一下，等待活动再次开启！'
          break;
        case 'activity_finish':
          msg = '您来晚了，活动已经结束！'
          break;
        case 'net_erro':
          msg = '网络错误，商家正在玩命抢修中！'
          break;
        default:
          msg = '发生错误，请重新扫描二维码'
      }
      return msg
    }
  }
}

</script>
<style lang="scss">
.erro {
  height: 2rem;
  width: 3rem;
  transition: height 0.2s;
  background: #fff;
  border-radius: 0.13rem;
  padding: 0.5rem 1rem 0.5rem 3rem;
  position: absolute;
  top: 6rem;
  left: 1.5rem;
  font-size: 0.5rem;
  z-index: 3;
  img {
    width: 3rem;
    height: 3rem;
    position: absolute;
    top: -1.5rem;
    left: 0;
  }
}

</style>

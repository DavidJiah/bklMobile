<template>
  <div class="result" :style="img">
    <LoaderRainbow v-if="loading"></LoaderRainbow>
    <template v-else>
      <Success v-if="msg === 'success'" :opened="opened" :codeInfo="codeInfo" :openId="openId"></Success>
      <billboard v-else-if="msg === 'already_scaned'" :codeInfo="codeInfo"></billboard>
      <scan-erro v-else :msg="msg"></scan-erro>
    </template>
  </div>
</template>
<script>
import { initResult, getOpenId } from "@/api"
import { getQueryString, getDevice } from "@/utils"
import { LoaderRainbow } from "@/components/loaders"
import Billboard from "./Billboard"
import Success from "./Success"
import ScanErro from "./ScanErro"

export default {
  components: {
    LoaderRainbow,
    Billboard,
    Success,
    ScanErro
  },
  created() {
    const code = getQueryString("code")
    const qrCodeId = getQueryString("state")
    const openId = getQueryString("openId")
    const msg = getQueryString("shareErro")
    if (!msg) {
      if (!openId) {
        this.init(code, qrCodeId)
      } else {
        this.getScanRes(qrCodeId, openId)
      }
    } else {
      this.msg = msg
    }
  },
  mounted() {
    this.hiddenWxMenu()
  },
  data() {
    return {
      img: {
        background: "url(" + require('@/assets/bk.png') + ") no-repeat",
        'background-size': "100% 100%",
        "-moz-background-size": "100% 100%",
        "-webkit-background-size": "100% 100%",
        "-o-background-size": "100% 100%"
      },
      codeInfo: null,
      openId: '',
      msg: "",
      opened: false,
      loading: false
    }
  },
  watch: {
    codeInfo(val) {
      if (val.scanResult > 0) {
        setTimeout(() => {
          this.opened = true
        }, 1200)
      }
    }
  },
  methods: {
    init(code, qrCodeId) {
      this.loading = true
      getOpenId(code).then(res => {
        const data = res.data
        if (data.code === 0 && data.msg === "success") {
          this.openId = data.data
          this.getScanRes(qrCodeId, data.data)
        } else {
          this.msg = data.msg
          this.loading = false
        }

      }).catch(erro => {
        this.msg = 'net_erro'
        this.loading = false
      })
    },
    getScanRes(qrCodeId, openId) {
      this.loading = true
      initResult(qrCodeId, openId, getDevice()).then(res => {
        this.codeInfo = res.data.data
        this.msg = res.data.msg
        this.loading = false
      }).catch(erro => {
        this.msg = 'net_erro'
        this.loading = false
      })
    }
  }
}

</script>
<style lang="scss">
@import "src/styles/mixin.scss";

.result {
  // font-size: 3rem;
  height: 100%;
  &:after {
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    background-color: #000;
    opacity: 0.6;
    z-index: 1;
    width: 100%;
    height: 100%;
  }

  .fs35 {
    font-size: 0.35rem;
    position: relative;
    top: -0.3rem;
  }
  .fs4 {
    font-size: 0.4rem;
  }
  .fs5 {
    font-size: 0.5rem;
  }
}

</style>

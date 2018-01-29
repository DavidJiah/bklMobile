<template>
  <div class="share" :style="img">
    <LoaderDemo v-if="loading"></LoaderDemo>
    <div class="share-advert" v-if="codeInfo&&!loading">
      <img :src="codeInfo.vo.adImg">
      <span class="adTitle"> {{codeInfo.vo.adTitle}} </span>
    </div>
  </div>
</template>
<script>
import { getQrCodeInfo } from '@/api'
import { getQueryString } from "@/utils"
import { LoaderDemo } from "@/components/loaders"

export default {
  components: {
    LoaderDemo
  },
  data() {
    return {
      img: {
        background: "url(" + require('@/assets/share.png') + ") no-repeat",
        'background-size': "100% 100%",
        "-moz-background-size": "100% 100%",
        "-webkit-background-size": "100% 100%",
        "-o-background-size": "100% 100%"
      },
      codeInfo: null,
      loading: false
    }
  },
  mounted() {
    this.loading = true
    const codeInfo = {
      id: getQueryString('qrCodeId'),
      openId: getQueryString('openId'),
      activity: getQueryString('activityId'),
      vo: {
        adTitle: decodeURI(getQueryString('adTitle')),
        adImg: decodeURIComponent(getQueryString('adImg'))
      }
    }
    setTimeout(() => {
      this.wxShare(codeInfo)
    })
    this.codeInfo = codeInfo
  }
}

</script>
<style lang="scss">
@import "src/styles/mixin.scss";
.share {
  height: 100%;
  @include flex;
  @include flex-align-center;
  @include flex-pack-center;
  &-advert {
    width: 6.1rem;
    padding: 0.15rem;
    background: #f3f3f5;
    @include flex;
    @include flex-pack-justify;
    @include flex-align-center;
    img {
      width: 1rem;
      height: 1rem;
    }
  }
}

</style>

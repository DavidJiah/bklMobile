<template>
  <div>
    <LoaderRainbow v-if="!advert"></LoaderRainbow>
    <Article v-else :advert="advert"></Article>
  </div>
</template>
<script>
import { LoaderRainbow } from "@/components/loaders"
import { getQueryString } from "@/utils"
import { findAdvByActivityId } from '@/api/advert'
import Article from './Article'

export default {
  components: {
    LoaderRainbow,
    Article
  },
  data() {
    return {
      url: '',
      loading: false,
      advert: null
    }
  },
  created() {
    const activityId = getQueryString("activityId")
    this.findAdvByActivityId(activityId)
  },
  methods: {
    findAdvByActivityId(activityId) {
      this.loading = true
      findAdvByActivityId(activityId).then(res => {
        const data = res.data
        if (data.code === 0 && data.msg === 'success') {
          if (data.data.type === 1) {
            document.title = '正在跳转'
            window.location.href = data.data.url
          }
          if (data.data.type === 0) {
            this.advert = data.data
            document.title = data.data.vo.activityName
          }
        }
        this.loading = false
      })
    }
  }
}

</script>

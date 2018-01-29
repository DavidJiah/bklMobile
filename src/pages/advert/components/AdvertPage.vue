<template>
  <div>
    <LoaderRainbow v-if="loading"></LoaderRainbow>
  </div>
</template>
<script>
import { LoaderRainbow } from "@/components/loaders"
import { getQueryString } from "@/utils"
import { countClickData } from '@/api'

export default {
  components: {
    LoaderRainbow
  },
  data() {
    return {
      url: '',
      loading: false
    }
  },
  created() {
  	this.loading = true
    const activityId = getQueryString("activityId")
    countClickData(activityId).then(res => {
      const data = res.data
      if (data.code === 0 && data.msg === 'success') {
      	this.loading = false
        window.location.href = data.data
      }
    })

  }
}

</script>

<template>
  <div id="app">
    <advert-page></advert-page>
  </div>
</template>
<script>
import AdvertPage from './components/AdvertPage'

export default {
  name: 'app',
  components: {
  	AdvertPage
  }
}

</script>
<style lang="scss">
@import './../../styles/index.scss';

</style>

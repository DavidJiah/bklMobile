<template>
  <div id="app">
  	<share-page></share-page>
  </div>
</template>
<script>
import SharePage from './components/SharePage'
export default {
  name: 'app',
  components: {
    SharePage
  }
}

</script>
<style lang="scss">
@import './../../styles/index.scss';

</style>

<template>
  <div class="article-contain">
    <div class="article-contain-title">{{advert.title}}</div>
    <div class="article-contain-author">
      <span>{{advert.createDate | parseTime('{y}-{m}-{d}')}}</span>
      <span>{{advert.author}}</span>
    </div>
    <div v-html="advert.content"></div>
    <div style="color: #8c8c8c">阅读 {{advert.readCount}}</div>
  </div>
</template>
<script>
export default {
  props: {
    advert: {
      type: Object,
      default: null
    }
  }
}

</script>
<style lang="scss">
.article-contain {
  margin: 20px 15px 15px;
  overflow-x: hidden;
  font-size: 16px;
  background:#ffffff;
  padding-bottom: 50px;
  &-title {
    margin-bottom: 10px;
    line-height: 1.4;
    font-weight: 400;
    font-size: 24px;
  }
  &-author {
    margin-bottom: 18px;
    line-height: 17px;
    color: #8c8c8c;
    font-size: 17px;
    vertical-align: middle;
  }
}

</style>

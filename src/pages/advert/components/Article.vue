<template>
  <div class="article">
    <div class="article-title">{{value.title}}</div>
    <div class="article-author">
      <span>{{value.createDate | parseTime('{y}-{m}-{d}')}}</span>
      <span>{{value.author}}</span>
    </div>
    <div v-html="value.content"></div>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Object,
      default: null
    }
  }
}

</script>
<style lang="scss" scoped>
.article {
  margin: 20px 15px 15px;
  overflow-x: hidden;
  font-size: 16px;
  &-title {
    margin-bottom: 10px;
    line-height: 1.4;
    font-weight: 400;
    font-size: 24px;
  }
  &-author {
    margin-bottom: 18px;
    line-height: 20px;
    color: #8c8c8c;
    vertical-align: middle;
  }
}

</style>

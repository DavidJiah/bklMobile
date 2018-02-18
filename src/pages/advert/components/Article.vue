<template>
  <div class="article-contain">
    <div class="article-contain-title">{{advert.title}}</div>
    <div class="article-contain-author">
      <span>{{advert.createDate | parseTime('{y}-{m}-{d}')}}</span>
      <span>{{advert.author}}</span>
    </div>
    <div v-html="advert.content" id="advertHtml"></div>
    <div style="color: #8c8c8c">阅读 {{advert.readCount}}</div>
    <prew-img v-if="showPrewImg" v-model="imgSelected" @changeImg="changeImg" @close="closeImgPrew"></prew-img>
  </div>
</template>
<script>
import PrewImg from '../plugin/PrewImg'
export default {
  props: {
    advert: {
      type: Object,
      default: null
    }
  },
  components: {
    PrewImg
  },
  data() {
    return {
      imgList: [],
      imgSelected: '',
      showPrewImg: false
    }
  },
  methods: {
    changeImg(obj) {
      if (obj.swiperType === 'next') {
        console.log(this.imgList.indexOf(obj.currentSrc))
        if (this.imgList.indexOf(obj.currentSrc) + 1 === this.imgList.length) {
          this.imgSelected = this.imgList[0]
        } else {
          this.imgSelected = this.imgList[this.imgList.indexOf(obj.currentSrc) + 1]
        }
      } else {
        if (this.imgList.indexOf(obj.currentSrc) === 0) {
          this.imgSelected = this.imgList[this.imgList.length - 1]
        } else {
          this.imgSelected = this.imgList[this.imgList.indexOf(obj.currentSrc) - 1]
        }
      }
    },
    closeImgPrew() {
      this.showPrewImg = false
    }
  },
  mounted() {
    const _this = this
    this.$nextTick(() => {
      const html = document.getElementById('advertHtml')
      const htmlWidth = html.offsetWidth
      const imgHTMLCollection = html.getElementsByTagName('img')
      for (let i = imgHTMLCollection.length - 1; i >= 0; i--) {
        if (imgHTMLCollection[i].offsetWidth >= htmlWidth) {
          imgHTMLCollection[i].style.width = htmlWidth + 'px'
          const imgScale = imgHTMLCollection[i].offsetHeight / imgHTMLCollection[i].offsetWidth
          if (imgScale !== 0) imgHTMLCollection[i].style.height = (htmlWidth * imgScale) + 'px'
        }
        _this.imgList.push(imgHTMLCollection[i].src)
        imgHTMLCollection[i].addEventListener("click", function() {
          _this.imgSelected = this.src
          _this.showPrewImg = true
        }, false)
      }
    })
  }
}

</script>
<style lang="scss">
.article-contain {
  margin: 20px 15px 15px;
  overflow-x: hidden;
  font-size: 16px;
  background: #ffffff;
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

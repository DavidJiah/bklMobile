<template>
  <div class="swiper" id="swiper" v-finger:tap="close">
    <div class="swiper-wrapper">
      <img v-show="!loading" :src="src" v-finger:swipe="swipe" :width="width" :height="height">
    </div>
  </div>
</template>
<script>
export default {
  name: 'Swiper',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      currentIndex: 0,
      swipeAction: 'swipe-left',
      src: '',
      width: 0,
      height: 0,
      loading: false
    }
  },
  watch: {
    value() {
      this.onloadImg()
    }
  },
  mounted() {
    this.onloadImg()
  },
  methods: {
    next() {
      this.$emit('changeImg', { swiperType: 'next', currentSrc: this.value })
    },
    prev() {
      this.$emit('changeImg', { swiperType: 'prev', currentSrc: this.value })
    },
    onloadImg(swiperWidth) {
      const swiperDivWidth = document.getElementById('swiper').offsetWidth
      const swiperDivHeight = document.getElementById('swiper').offsetHeight
      const _this = this
      _this.loading = true
      const img = new Image()
      img.src = this.value
      img.onload = function() {
        _this.loading = false
        const imgScale = img.height / img.width
        if (img.width >= swiperDivWidth) {
          _this.width = swiperDivWidth
          _this.height = imgScale * swiperDivWidth
        } else if (img.height >= swiperDivHeight * 0.8) {
          _this.height = swiperDivHeight * 0.8
          _this.width = swiperDivHeight * 0.8 / imgScale
        }
        _this.src = img.src
      }
    },
    swipe(evt) {
      if (evt.direction === 'Left') {
        this.next()
        this.swipeAction = 'swipe-left'
      } else {
        this.prev()
        this.swipeAction = 'swipe-right'
      }
    },
    close(){
      this.$emit('close')
    }
  },
}

</script>
<style lang="scss">
.swiper {
  font-size: 0;
  background-color: #000000;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  .swiper-wrapper {
    width: 100%;
    max-height: 80vh;
    .swiper-list {
      // position: relative;
      // width: 100%;
      .swiper-item {
        // position: absolute;
        // display: inline-block;
        // left: 0;
        // top: 0;
        // width: 100%;
        // height: 100%;
        .swiper-img {
          width: 100%;
          position: absolute;
          right: 0;
          left: 0;
          &.swipe-left-enter-active,
          &.swipe-left-leave-active,
          &.swipe-right-enter-active,
          &.swipe-right-leave-active {
            transition: all .5s ease;
          }
          &.swipe-left-enter {
            transform: translateX(100%);
          }
          &.swipe-left-leave-to {
            transform: translateX(-100%);
          }
          &.swipe-right-enter {
            transform: translateX(-100%);
          }
          &.swipe-right-leave-to {
            transform: translateX(100%);
          }
        }
      }
    }
  }
}

</style>

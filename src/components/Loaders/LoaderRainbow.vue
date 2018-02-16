<template>
  <div class="loader">
    <div class="loader-inner">
      <div class="loader-line-wrap">
        <div class="loader-line"></div>
      </div>
      <div class="loader-line-wrap">
        <div class="loader-line"></div>
      </div>
      <div class="loader-line-wrap">
        <div class="loader-line"></div>
      </div>
      <div class="loader-line-wrap">
        <div class="loader-line"></div>
      </div>
      <div class="loader-line-wrap">
        <div class="loader-line"></div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.loader {
  background: #000;
  background: radial-gradient(#222, #000);
  bottom: 0;
  left: 0;
  overflow: hidden;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 99999;
}

.loader-inner {
  bottom: 0;
  height: 0.8rem;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  width: 1.333333rem;
}

.loader-line-wrap {
  -webkit-animation: spin 2000ms cubic-bezier(.175, .885, .32, 1.275) infinite;
  animation: spin 2000ms cubic-bezier(.175, .885, .32, 1.275) infinite;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  height: 0.666667rem;
  left: 0;
  overflow: hidden;
  position: absolute;
  top: 0;
  -webkit-transform-origin: 50% 100%;
  transform-origin: 50% 100%;
  width: 1.333333rem;
}

.loader-line {
  border: 0.05rem solid transparent;
  border-radius: 100%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  height: 1.333333rem;
  left: 0;
  margin: 0 auto;
  position: absolute;
  right: 0;
  top: 0;
  width: 1.333333rem;
}

.loader-line-wrap:nth-child(1) {
  -webkit-animation-delay: -50ms;
  animation-delay: -50ms;
}

.loader-line-wrap:nth-child(2) {
  -webkit-animation-delay: -100ms;
  animation-delay: -100ms;
}

.loader-line-wrap:nth-child(3) {
  -webkit-animation-delay: -150ms;
  animation-delay: -150ms;
}

.loader-line-wrap:nth-child(4) {
  -webkit-animation-delay: -200ms;
  animation-delay: -200ms;
}

.loader-line-wrap:nth-child(5) {
  -webkit-animation-delay: -250ms;
  animation-delay: -250ms;
}

.loader-line-wrap:nth-child(1) .loader-line {
  border-color: hsl(0, 80%, 60%);
  height: 1.2rem;
  width: 1.2rem;
  top: 0.093333rem;
}

.loader-line-wrap:nth-child(2) .loader-line {
  border-color: hsl(60, 80%, 60%);
  height: 1.013333rem;
  width: 1.013333rem;
  top: 0.186667rem;
}

.loader-line-wrap:nth-child(3) .loader-line {
  border-color: hsl(120, 80%, 60%);
  height: 0.826667rem;
  width: 0.826667rem;
  top: 0.28rem;
}

.loader-line-wrap:nth-child(4) .loader-line {
  border-color: hsl(180, 80%, 60%);
  height: 0.64rem;
  width: 0.64rem;
  top: 0.373333rem;
}

.loader-line-wrap:nth-child(5) .loader-line {
  border-color: hsl(240, 80%, 60%);
  height: 0.453333rem;
  width: 0.453333rem;
  top: 0.466667rem;
}

@-webkit-keyframes spin {
  0%,
  15% {
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes spin {
  0%,
  15% {
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

</style>

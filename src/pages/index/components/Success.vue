<template>
  <div class="redPacket" :class="{'isOpen':opened,'isShare':codeInfo.shareFlag&&opened}">
    <div class="redPacket-head">
      <img class="avatar" :src="codeInfo.vo.userPhoto">
      <template v-if="!opened">
        <span class="fs4">{{codeInfo.vo.userCompanyName}}</span>
        <span class="fs35">发了一个红包，打开看看</span>
        <span class="fs5">恭喜发财，大吉大利</span>
      </template>
    </div>
    <div class="redPacket-openBtn" v-if="!opened">
      <span>開</span>
    </div>
    <div class="redPacket-center" v-if="opened">
      <span class="centent-top">{{codeInfo.vo.userCompanyName}}的红包</span>
      <span class="centent-wishWord">恭喜发财，大吉大利</span>
      <div class="centent-bottom">
        <span class="money">{{codeInfo.scanResult / 100}}</span>
        <span>元</span>
      </div>
      <div v-if="codeInfo.shareFlag" class="getSuccess">已存入零钱</div>
      <div v-else class="button" @click="click">点击存入零钱</div>
    </div>
    <div class="redPacket-footer" v-if="opened&&!codeInfo.shareFlag">
      <div class="redPacket-footer-content">
        <span style="font-weight:bold;">*活动规则：</span>
        <span style="margin-top:0.4rem;">1.前往线下站点参与活动，刮开二维码微信扫一扫；</span>
        <span>2.按页面提示领奖，完成任务后现金自动转入零钱；</span>
        <span style="margin-top:0.4rem;font-weight:bold;">*温馨提示：</span>
        <span>参与人数众多，零钱到账可能延迟，请耐心等待；</span>
        <span style="margin-top:0.4rem;font-weight:bold;">*本活动最终解释权归主办方所有*</span>
      </div>
    </div>
    <div v-else-if="opened&&codeInfo.shareFlag" class="redPacket-billboard">
      <div class="redPacket-billboard-packetNum">
        <span class="title">已领取{{total}}/{{codeInfo.vo.qrCount}}个</span>
      </div>
      <div v-for="item in list" class="redPacket-billboard-item">
        <div class="user">
          <img class="avatar" :src="item.vo.customerPhoto">
          <div style="text-align: left;">
            <div>{{item.vo.customerName}}</div>
            <div>{{item.updateDate | parseTime('{m}-{d} {h}:{i}:{s}')}}</div>
          </div>
        </div>
        <div class="money">
          <span>{{item.scanResult / 100}}元</span>
        </div>
      </div>
      <div class="redPacket-billboard-bottom">
        <span v-if="isLast" @click="getMore">查看更多</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    codeInfo: {
      type: Object
    },
    opened: {
      type: Boolean
    },
    openId: {
      type: String
    }
  },
  data() {
    return {
      list: [], //数据
      showlaoding: true, //是否显示loading效果
      total: 0,
      pages: 0,
      listQuery: {
        current: 1, //页码
        size: 20,
        condition: {
          activity: this.codeInfo.activity
        }
      }
    }
  },
  methods: {
    click() {
      location.href = "share.html?openId=" + this.openId + "&adTitle=" + encodeURI(encodeURI(this.codeInfo.vo.adTitle)) + "&adImg=" + encodeURIComponent(this.codeInfo.vo.adImg) + "&activityId=" + this.codeInfo.activity + "&qrCodeId=" + this.codeInfo.id
    },
    getList() {
      this.showlaoding = true
      console.log(this.listQuery)
      getActivityScaned(this.listQuery).then(res => {
        const data = res.data
        if (data.code === 0 && data.msg === 'success') {
          this.list = this.list.concat(data.datas.records)
          this.pages = data.datas.pages
          this.total = data.datas.total
          this.showlaoding = false
        }
      })
    },
    getMore() {
      this.listQuery.current += 1
      this.getList()
    }
  },
  computed: {
    isLast() {
      return this.pages > this.listQuery.current
    }
  },
  mounted() {
    this.getList()
  }
}

</script>
<style lang="scss" scoped>
@import "src/styles/mixin.scss";

.redPacket {
  height: 9rem;
  width: 7rem;
  background: #cd533d;
  border-radius: 0.13rem;
  z-index: 2;
  position: absolute;
  top: 1.8rem;
  left: 1.5rem;
  &-head {
    height: 4rem;
    width: 100%;
    background-color: #d85940;
    color: #ffe2b1;
    border-radius: 10px 10px 50% 50% / 10px 10px 15% 15%;
    box-shadow: 0px 4px 0px -1px rgba(0, 0, 0, 0.2);
    padding: 0.5rem 0 1.5rem 0;
    @include flex;
    @include flex-direction-column;
    @include flex-align-center;
    @include flex-pack-justify;
    .avatar {
      width: 1.1rem;
      height: 1.1rem;
      border-radius: 0.1rem;
      padding: 2px;
      background: #fff;
      margin: 0 auto;
    }
  }

  &-openBtn {
    width: 1.6rem;
    height: 1.6rem;
    border-radius: 50%;
    background-color: #ebcd9a;
    font-size: 1rem;
    color: #303030;
    box-shadow: 0px 4px 0px 0px rgba(0, 0, 0, 0.2);
    margin: -0.8rem auto;
    @include flex;
    @include flex-pack-center;
    @include flex-align-center;
    @include rotate;
  }
  &-footer {
    background: #cd533d;
    color: #ffe2b1;
    width: 100%;
    &-content {
      width: 90%;
      margin: auto;
      padding-top: 0.8rem;
      span {
        font-size: 0.38rem;
        line-height: 0.6rem;
        display: block;
        text-align: left;
      }
    }
  }
}

.isOpen {
  height: 100%;
  width: 100%;
  border-radius: 0;
  top: 0;
  left: 0;
  .redPacket-head {
    position: absolute;
    top: 0;
    height: 1.8rem;
    transition: height .15s;
    transition: border-radius .15s;
    background-color: #d85940;
    padding: 0;
    color: #ffe2b1;
    border-radius: 0% 0% 50% 50% / 0 0 100% 100%;
    -webkit-border-radius: 0% 0% 50% 50% / 0 0 100% 100%;
    .avatar {
      width: 1.5rem;
      height: 1.5rem;
      position: relative;
      top: 1.05rem;
    }
  }
  .redPacket-center {
    text-align: center;
    padding: 2.8rem 0 0.3rem 0;
    background: #f1f1f1;
    .centent-top {
      font-size: 0.38rem;
      font-weight: bold;
      display: block;
    }
    .centent-wishWord {
      font-size: 0.38rem;
      display: block;
      margin-top: 0.1rem;
    }
    .centent-bottom {
      margin-top: 0.1rem;
      font-size: 0.45rem;
      .money {
        font-size: 1.5rem;
        color: #d85940;
        font-family: Tahoma, Helvetica, Arial, '宋体', sans-serif;
      }
    }
    .button {
      font-size: 0.5rem;
      margin-top: 0.5rem;
      background: #607d8b;
      padding: 0.1rem 0.2rem;
      margin: 0.5rem 3rem 0 3rem;
      color: #fff;
    }
    .getSuccess {
      font-size: 0.38rem;
      margin-top: 0.3rem;
      color: #4f6faf;
    }
  }
}

.isShare {
  background: #fff;

  .redPacket-billboard {
    width: 100%;
    background: #fff;
    padding-bottom: 0.3rem;
    &-packetNum {
      text-align: left;
      padding: 0.2rem 0.4rem;
      font-size: 0.34rem;
      color: #929292;
      border-bottom: 2px solid #f1f1f1;
    }
    &-item {
      padding: 0.3rem;
      @include flex;
      @include flex-pack-justify;
      border-bottom: 2px solid #f1f1f1;
      .user {
        @include flex;
        font-size: 0.38rem;
        .avatar {
          width: 1.1rem;
          height: 1.1rem;
          border-radius: 0.1rem;
          padding: 2px;
          background: #fff;
          margin-right: 0.2rem;
        }
      }
      .money {
        font-size: 0.36rem;
        text-align: right;
      }
    }
    &-bottom {
      padding-top: 0.3rem;
      font-size: 0.35rem;
      color: #4f6faf;
    }
  }
}

</style>

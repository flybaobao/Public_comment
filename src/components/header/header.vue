<template>
  <div class="header" v-if="seller.supports">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" alt="">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div class="support" v-if="seller.supports">
          <span class="icon" :class="classMape[seller.supports[4].type]"></span>
          <span class="text">{{seller.supports[4].description}}</span>
        </div>
      </div>
      <div class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <span class="icon-keyboard_arrow_right"></span>
      </div>
    </div>
    <div class="butter-wrapper">
      <span class="butter-tittle"></span><span class="butter-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"  @click="showDetail"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" alt="" width="100%" height="100%">
    </div>
    <div class="detail" v-show="detailShow">
      <div class="derail-wrapper clear-fix">
        <div class="main">
          <h1 class="name">{{seller.name}}</h1>

        </div>
      </div>
      <div class="detail-close" @click="closeDetail">
        <span class="icon-close"></span>
      </div>

    </div>
  </div>
</template>

<script>
import stars from "../stars/stars.vue"

export default {
  data () {
    return {
      detailShow: false
    }
  },
  props: {
    seller: {
      type: Object
    }
  },
  created () {
    this.classMape = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  methods: {
    showDetail () {
      this.detailShow = true
    },
    closeDetail () {
      this.detailShow = false
    }
  }
}
</script>

<style lang="less" scoped="scoped">
  @import '../../common/less/mixin.less';
  @import '../../common/css/icon.css';
  @import '../../common/less/base.less';

  .header{
    position: relative;
    background-color: rgba(7,17,27,0.5);
    overflow: hidden;
    color: #ffffff;
    font-weight: 200;
    .content-wrapper{
      position: relative;
      padding:24px 12px 18px 24px;
      font-size: 0;
      .avatar{
        display: inline-block;
        width:64px;
        height:64px;
        border-radius: 2px;
        overflow: hidden;
        vertical-align: top;
        img{
          width:100%;
          height:100%;
        }
      }
      .content{
        display: inline-block;
        font-size: 14px;
        margin-left: 16px;
        .title{
          margin: 2px 0 8px 0;
          .brand{
            width:30px;
            height: 18px;
            display: inline-block;
            vertical-align: top;
            .bg-img('../../components/header/images/brand');
          }
          .name{
            font-size: 16px;
            font-weight: bold;
            line-height: 18px;
          }
        }
        .description{
          font-size: 12px;
          line-height:12px;
          margin-bottom: 8px;
        }
        .support{
          margin-bottom: 2px;
          .icon{
            display: inline-block;
            width:12px;
            height:12px;
            margin-right: 4px;
            background-size: 12px 12px;
            background-repeat: no-repeat;
            vertical-align: middle;
            &.decrease{
              .bg-img('../../components/header/images/decrease_1');
            }
            &.discount{
              .bg-img('../../components/header/images/discount_1');
            }
            &.guarantee{
              .bg-img('../../components/header/images/guarantee_1');
            }
            &.invoice{
              .bg-img('../../components/header/images/invoice_1');
            }
            &.special{
              .bg-img('../../components/header/images/special_1');
            }
          }
          .text{
            font-size:10px;
            line-height: 12px;
          }
        }
      }
      .support-count{
        position:absolute;
        right:12px;
        bottom:14px;
        padding:0 8px;
        height:24px;
        line-height:24px;
        -webkit-border-radius: 14px;
        -moz-border-radius: 14px;
        border-radius: 14px;
        background-color: rgba(0,0,0,0.2);
        text-align: center;
        .count{
          vertical-align: top;
          font-size:10px;
        }
        .icon-keyboard_arrow_right{
          font-size: 10px;
          line-height: 24px;
          margin-left: 2px;
        }
      }
    }
    .butter-wrapper{
      position:relative;
      height:28px;
      line-height: 28px;
      padding:0 22px 0 12px;
      white-space:nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      background-color: rgba(7,17,27,0.2);
      .butter-tittle{
        display: inline-block;
        vertical-align: top;
        margin-top: 8px;
        width:22px;
        height:12px;
        .bg-img('../../components/header/images/bulletin');
        background-size: 22px 12px;
        background-repeat: no-repeat;
      }
      .butter-text{
        vertical-align: top;
        font-size:10px;
        color: rgb(255,255,255);
        margin:0 4px;
      }
      .icon-keyboard_arrow_right{
        position:absolute;
        font-size: 10px;
        right:12px;
        top:9px;
      }
    }
    .background{
      position:absolute;
      top:0;
      left:0;
      width:100%;
      height:100%;
      z-index: -1;
      filter:blur(10px);
    }
    .detail{
      position:fixed;
      top:0;
      left:0;
      z-index:100;
      width:100%;
      height:100%;
      overflow: auto;
      background-color: rgba(7,17,27,0.8);
      .derail-wrapper{
        min-height: 100%;
        width:100%;
        .main{
          margin-top: 64px;
          padding-bottom: 64px;
          .name{
            line-height:16px;
            font-weight: 700;
            font-size:16px;
            text-align: center;
          }
        }
      }
      .detail-close{
        position: relative;
        width:32px;
        height:32px;
        font-size: 32px;
        margin: -64px auto 0 auto;
        clear: both;
      }
    }
  }
</style>

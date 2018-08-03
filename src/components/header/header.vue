<template>
  <div class="header">
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
          <span class="icon decrease" :class="classMape[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
    </div>
    <div class="butter-wrapper"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: {
    seller: {
      type: Object
    }
  },
  created () {
    this.classMape = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  }
}
</script>

<style lang="less" scoped="scoped">
  @import '../../common/less/mixin.less';

  .header{
    background-color: black;
    color: #ffffff;
    font-weight: 200;
    .content-wrapper{
      padding:24px 12px 18px 24px;
      font-size: 0;
      .avatar{
        display: inline-block;
        width:64px;
        height:64px;
        border-radius: 2px;
        overflow: hidden;
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
        }
        .support{
          margin: 10px 0 2px 0;
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
    }
  }
</style>

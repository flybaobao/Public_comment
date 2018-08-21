<template>
  <div class="seller" ref="sellerWrapper">
    <div class="seller-content">
      <div class="over-view">
        <h1 class="title">{{seller.name}}</h1>
        <div class="dec vux-1px-b">
          <stars class="star" :size="36" :score="seller.score"></stars>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售 {{seller.sellCount}} 单</span>
        </div>
        <ul class="remark">
          <li class="block vux-1px-r">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block vux-1px-r">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>元
            </div>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper">
          <p class="content">{{seller.bulletin}}</p>
        </div>
      </div>
      <ul class="supports">
        <li class="support-item vux-1px-tb" v-for="(item, index) in seller.supports" :key="index">
          <span class="icon" :class="classMap[seller.supports[index].type]"></span>
          <span class="text">{{item.description}}</span>
        </li>
      </ul>
      <split></split>
    </div>
  </div>
</template>

<script>
import stars from '../stars/stars'
import split from '../split/split'
import BScroll from 'better-scroll'
export default {
  data () {
    return {

    }
  },
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    stars,
    split
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    this.$nextTick(() => {
      this._scrolls()
    })
  },
  methods: {
    _scrolls () {
      this.sellerScroll = new BScroll(this.$refs.sellerWrapper, {

      })
    }
  }
}
</script>

<style lang="less" scoped="scoped">
  @import '../../common/less/mixin.less';
  @import '../../common/css/icon.css';
  @import '../../common/less/base.less';
.seller{
  position:absolute;
  top:174px;
  bottom:0;
  left:0;
  width:100%;
  overflow: hidden;
  .over-view{
    padding:18px;
    .title{
      margin-bottom: 8px;
      line-height:14px;
      color: rgb(7,17,27);
      font-size:14px;
    }
    .dec{
      padding-bottom:18px;
      line-height: 18px;
      font-size:0;
      .star{
        display: inline-block;
        margin-right: 12px;
        vertical-align: top;
      }
      .text{
        display: inline-block;
        font-size:10px;
        margin-right: 12px;
        vertical-align: top;
      }
    }
    .remark{
      display: flex;
      padding-top:18px;
      .block{
        flex:1;
        text-align: center;
        h2{
          line-height:20px;
          font-size: 10px;
          color: rgb(147,153,159);
        }
        .content{
          line-height:24px;
          margin-top: 4px;
          font-size:10px;
          color:rgb(7,17,27);
          font-weight:100;
          .stress{
            font-size:24px;
          }
        }
      }
    }
  }
  .bulletin{
    padding:18px 18px 0 18px;
    .title{
      line-height: 14px;
      font-size:14px;
      color:rgb(7,17,27);
      margin-bottom:8px;
    }
    .content-wrapper{
      padding:0 12px 16px 12px;
      .content{
        line-height:24px;
        font-size:12px;
        font-weight:200;
        color: rgb(240,20,20);
      }
    }
  }
  .supports{
    padding:0 18px;
    .support-item{
      padding: 16px 12px;
      .icon{
        display: inline-block;
        width:12px;
        height:12px;
        margin-right: 4px;
        background-size: 12px 12px;
        background-repeat: no-repeat;
        vertical-align: middle;
        &.decrease{
          .bg-img('../../components/seller/images/decrease_4');
        }
        &.discount{
          .bg-img('../../components/seller/images/discount_4');
        }
        &.guarantee{
          .bg-img('../../components/seller/images/guarantee_4');
        }
        &.invoice{
          .bg-img('../../components/seller/images/invoice_4');
        }
        &.special{
          .bg-img('../../components/seller/images/special_4');
        }
      }
      .text{
        line-height:16px;
        font-size:12px;
        font-weight:100;
        color: rgb(7,17,27);
      }
    }
  }
}
</style>

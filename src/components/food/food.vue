<template>
  <transition name="move">
    <div class="food" v-show="showFlag" ref="foods">
      <div class="food-content">
        <div class="img-header">
          <img :src="food.image" alt="">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月销{{food.sellCount}}份</span>
            <span class="">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="newPrice">¥{{food.price}}</span><span class="oldPrice" v-if="food.oldPrice">¥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <cartcontrol :food="food"  v-on:cart-add="cartAdd"></cartcontrol>
          </div>
          <transition name="fade">
            <div @click="addFoods(food)" class="buy" v-show="!food.count || food.count === 0">加入购物车</div>
          </transition>
        </div>
        <split v-show="food.info"></split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <split></split>
        <div class="ratings">
          <h1 class="title">商品评价</h1>
          <ratingselect  @select-type-one="selectTypeOne" @select-type-two="selectTypeTwo" :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect>
          <div class="rating-wrapper">
            <ul v-show="food.ratings">
              <li v-for="(rating, index) in food.ratings" :key="index" class="rating-item vux-1px-b">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <div class="avatar"><img :src="rating.avatar" alt="" width="100%" height="100%"></div>
                </div>
                <div class="time">{{rating.rateTime | formatDate}}</div>
                <p class="text">
                  <span :class="{'icon-thumb_up':rating.rateType === 0, 'icon-thumb_down':rating.rateType === 1}"></span>{{rating.text}}
                </p>
              </li>
            </ul>
            <div class="no-ratings" v-show="!food.ratings"></div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import BScroll from 'better-scroll'
import Vue from 'vue'
import cartcontrol from '../buttonControl/buttonControl'
import split from '../split/split'
import ratingselect from '../ratingselect/ratingselect'
import { formatDate } from '@/common/js/date'
const ALL = 2

export default {
  data () {
    return {
      showFlag: false,
      selectType: ALL,
      onlyContent: true,
      desc: {
        all: '全部',
        pos: '推荐',
        neg: '吐槽'
      }
    }
  },
  props: {
    food: {
      type: Object
    },
    elm: {
      type: Object
    }
  },
  components: {
    cartcontrol,
    split,
    ratingselect
  },
  methods: {
    show () {
      this.selectType = ALL
      this.onlyContent = true
      this.showFlag = true
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.foods, {
            click: true
          })
        }
      })
    },
    hide () {
      this.showFlag = false
    },
    addFoods () {
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
      }
      this.$emit('cart-add', event.target)
    },
    cartAdd (el) {
      // dom元素更新后执行， 因此此处能正确打印出更改之后的值；
      // 体验优化，异步执行下一步动画
      this.$nextTick(() => {
        this.elm.drop(el)
        // 调用shopcart组件的drop()函数
      })
    },
    selectTypeOne (el) {
      this.selectType = el
      console.log(el)
    },
    selectTypeTwo (el) {
      this.onlyContent = el
      console.log(el)
    }
  },
  filters: {
    formatDate (time) {
      return formatDate(time)
    }
  }
}
</script>

<style lang="less" scoped="scoped">
  @import "../../common/css/icon.css";
  @import '~vux/src/styles/1px.less';
  .food{
    position:fixed;
    left:0;
    top:0;
    bottom:48px;
    z-index:30;
    width:100%;
    background-color: white;
    &.move-enter-active, &.move-leave-active {
      transition: all .2s linear;
    }
    &.move-enter, &.move-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
      transform: translate3d(-100%,0,0);
    }
    /*黑魔法假的懒加载*/
    .img-header{
      position: relative;
      width:100%;
      height:0;
      padding-top:100%;
      img{
        position: absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
      }
      .back{
        position: absolute;
        top:10px;
        left:0;
        .icon-arrow_lift{
          display: block;
          padding:10px;
          font-size: 20px;
          color: #ffffff;
        }
      }
    }
    .content{
      padding:18px;
      position: relative;
      .title{
        line-height: 14px;
        margin-bottom: 8px;
        font-size:14px;
        font-weight: 700;
        color:rgb(1,17,27);
      }
      .detail{
        margin-bottom: 18px;
        height:10px;
        line-height:10px;
        font-size:0;
        .sell-count,.rating{
          font-size:10px;
          color: rgb(147,153,159);
        }
        .sell-count{
          margin-right: 12px;
        }
      }
      .price{
        font-weight:700;
        line-height:24px;
        .newPrice{
          font-size:14px;
          color: rgb(240,20,20);
          margin-right: 8px;
        }
        .oldPrice{
          font-size:10px;
          color: rgb(147,153,159);
          text-decoration:line-through;
        }
      }
      .cartcontrol-wrapper{
        position:absolute;
        right:12px;
        bottom:12px;
      }
      .buy{
        position: absolute;
        right:18px;
        bottom:18px;
        z-index: 10;
        height:24px;
        line-height:24px;
        padding:0 12px;
        font-size:10px;
        box-sizing: border-box;
        border-radius: 12px;
        background-color: rgb(0,160,220);
        color: #ffffff;
        &.fade-enter-active, &.fade-leave-active {
          transition: opacity .2s;
        }
        &.fade-enter, &.fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
          opacity: 0;
        }
      }
    }
    .info{
      padding:18px;
      .title{
        line-height:14px;
        margin-bottom:6px;
        font-size:14px;
        color: rgb(7,17,27);
      }
      .text{
        line-height:24px;
        font-size:12px;
        padding:0 8px;
        color: #4d555d;
      }
    }
    .ratings{
      padding-top:18px;
      .title{
        line-height:14px;
        margin-left:18px;
        font-size:14px;
        color: rgb(7,17,27);
      }
      .rating-wrapper{
        padding: 0 18px;
        .rating-item{
          position: relative;
          padding:16px 0;
          .user{
            position: absolute;
            right:0;
            top:16px;
            font-size:0;
            line-height: 12px;
            .name{
              display: inline-block;
              margin-right: 6px;
              vertical-align: top;
              color: rgb(147,153,159);
              font-size:10px;
              line-height: 12px;
            }
            .avatar{
              width:12px;
              height:12px;
              display: inline-block;
              vertical-align: top;
              border-radius:50%;
              overflow: hidden;
            }
          }
          .time{
            margin-bottom:6px;
            line-height:12px;
            font-size:10px;
            color: rgb(147,153,159);
          }
          .text{
            line-height: 16px;
            font-size:12px;
            color: rgb(7,17,27);
            .icon-thumb_up,.icon-thumb_down{
              margin-right:4px;
              line-height: 24px;
              font-size:12px;
            }
            .icon-thumb_up{
              color: rgb(0,160,220);
            }
            .icon-thumb_down{
              color: rgb(147,153,159);
            }
          }
        }
        .no-ratings{
          padding:16px 0;
          font-size:12px;
          color: rgb(147,153,159);
        }
      }
    }
  }
</style>

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
        </div>
        <div class="cartcontrol-wrapper">
          <cartcontrol :food="food" v-on:cart-add="cartAdd"></cartcontrol>
        </div>
        <div @click="addFoods(food)" class="buy" v-show="!food.count || food.count === 0">加入购物车</div>
      </div>
    </div>
  </transition>
</template>

<script>
import BScroll from 'better-scroll'
import Vue from 'vue'
import cartcontrol from '../buttonControl/buttonControl'
export default {
  data () {
    return {
      showFlag: false
    }
  },
  props: {
    food: {
      type: Object
    }
  },
  components: {
    cartcontrol
  },
  methods: {
    show () {
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
    },
    cartAdd (el) {
      // dom元素更新后执行， 因此此处能正确打印出更改之后的值；
      // 体验优化，异步执行下一步动画
      this.$nextTick(() => {
        this.$refs['shopcart'].drop(el)
        // 调用shopcart组件的drop()函数
      })
    }
  }
}
</script>

<style lang="less" scoped="scoped">
  @import "../../common/css/icon.css";
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
    }
  }
</style>

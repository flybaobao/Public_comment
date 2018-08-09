<template>
<div class="shopcart">
  <div class="content">
    <div class="content-left">
      <div class="logo-wrapper">
        <div class="logo" :class="{'heightMark' : totalCount >0}">
          <span class="icon-shopping_cart"  :class="{'heightMark' : totalCount >0}"></span>
        </div>
        <div class="count" v-if="totalCount">{{totalCount}}</div>
      </div>
      <div class="price" :class="{'heightMark' : totalCount >0}">¥ {{totalPrice}}</div>
      <div class="desc">另需配送费 ¥ {{deliveryPrice}} 元</div>
    </div>
    <div class="content-right">
      <div class="pay" :class="payClass">{{payDesc}}</div>
    </div>
  </div>
  <div class="ball-container">
    <transition name="drop">
      <div v-for="(ball, index) in balls" v-show="ball.show" class="ball" :key="index">
        <div class="inner"></div>
      </div>
    </transition>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ]
    }
  },
  props: {
    deliveryPrice: {
      type: Number
    },
    minPrice: {
      type: Number
    },
    selectFoods: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    totalPrice () {
      let total = 0
      this.selectFoods.forEach((food) => {
        total += food.price * food.count
      })
      return total
    },
    totalCount () {
      let count = 0
      this.selectFoods.forEach((food) => {
        count += food.count
      })
      return count
    },
    payDesc () {
      if (this.totalPrice === 0) {
        return `¥ ${this.minPrice} 元起送`
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice
        return `还差 ¥ ${diff} 元起送`
      } else {
        return '去结算'
      }
    },
    payClass () {
      if (this.totalPrice >= this.minPrice) {
        return 'enough'
      } else {
        return 'noEnough'
      }
    }
  }
}
</script>

<style lang="less" scoped="scoped">
@import '../../common/css/icon.css';
.shopcart{
  position:fixed;
  left:0;
  bottom:0;
  z-index:50;
  width:100%;
  height:48px;
  color: rgba(255,255,255,0.4);
  .content{
    background-color: #141d27;
    display: flex;
    font-size: 0;
    .content-right{
      flex:0 0 105px;
      width:105px;
      background-color: #2b333b;
      .pay{
        height:48px;
        line-height:48px;
        font-size: 12px;
        font-weight:700;
        text-align: center;
        &.noEnough{
          background-color: #2b333b;
        }
        &.enough{
          background-color: #00b43c;
          color: #fff;
        }
      }
    }
    .content-left{
      flex:1;
      .logo-wrapper{
        display:inline-block;
        position: relative;
        top:-10px;
        margin:0 12px;
        padding:6px;
        height:56px;
        width:56px;
        border-radius: 50%;
        box-sizing: border-box;
        background-color: #141d27;
        .logo{
          width:100%;
          height:100%;
          border-radius: 50%;
          text-align: center;
          background-color: #2b343c;
          &.heightMark{
            background-color: rgb(0,160,220);
          }
          .icon-shopping_cart{
            line-height: 44px;
            font-size: 24px;
            &.heightMark{
              color: #fff;
            }
          }
        }
        .count{
          position: absolute;
          top:0;
          right:0;
          width:24px;
          height:16px;
          line-height:16px;
          text-align: center;
          font-size: 9px;
          box-shadow: 0 4px 8px 0px rgba(0,0,0,0.4);
          color: #ffffff;
          background-color: rgb(240,20,20);
          border-radius: 16px;
        }
      }
      .price{
        display: inline-block;
        vertical-align: top;
        margin-top: 12px;
        line-height:24px;
        padding-right:12px;
        box-sizing: border-box;
        border-right:1px solid rgba(255,255,255,0.1);
        font-size:16px;
        font-weight:700;
        &.heightMark{
          color: #fff;
        }
      }
      .desc{
        display: inline-block;
        vertical-align: top;
        line-height:24px;
        margin-left: 12px;
        margin-top: 12px;
        font-size:12px;
      }
    }
  }
  .ball-container{
    .ball{
      position: fixed;
      left:32px;
      z-index: 200;
      bottom:22px;

    }
  }
  .drop-enter-active {
    animation: drop-in .5s;
  }
  .drop-leave-active {
    animation: drop-in .5s reverse;
  }
  @keyframes drop-in {
    0% {
      opacity: 0;
      transform:translate3d(24px,0,0);
      transform:rotate(180deg);
    }
    100% {
      opacity: 1;
      transform:translate3d(0,0,0);
      transform:rotate(0);
    }
  }
}
</style>

<template>
  <div>
    <div class="shopcart">
      <div class="content" @click="toggleList">
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
        <!--.stop.prevent 阻止冒泡事件-->
        <div class="content-right" @click.stop.prevent="pay">
          <div class="pay" :class="payClass">{{payDesc}}</div>
        </div>
      </div>
      <div class="ball-container">
        <transition-group name="drop" v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter">
          <div v-for="(ball, index) in balls" v-show="ball.show" class="ball" :key="index">
            <div class="inner inner-hook"></div>
          </div>
        </transition-group>
      </div>
      <transition name="act">
        <div class="shopCart-list" v-show="listShow">
          <div class="list-header vux-1px-b">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="listCount">
            <ul>
              <li class="food vux-1px-b" v-for="(food, index) in selectFoods" :key="index">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>¥{{food.price*food.count}}</span>
                </div>
                <div class="control-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="list-mark" @click="hiddenList" v-show="listShow"></div>
    </transition>
  </div>

</template>

<script>
import cartcontrol from '../buttonControl/buttonControl'
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      balls: [
        {
          show: false, el: null
        },
        {
          show: false, el: null
        },
        {
          show: false, el: null
        },
        {
          show: false, el: null
        },
        {
          show: false, el: null
        }
      ],
      dropBalls: [],
      fold: true
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
    },
    listShow () {
      if (!this.totalCount) {
        /* eslint-disable */
        this.fold = true
        return false
      }
      let show = !this.fold
      if (show) {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.listCount, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      }
      return show
    }
  },
  // shopcart.vue组件的drop（）函数
  methods: {
    drop (el) {
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i]
        if (!ball.show) {
          ball.show = true
          ball.el = el
          this.dropBalls.push(ball)
          return
        }
      }
    },
    // --------
    // 进入中
    // --------

    beforeEnter (el) {
      // ...
      let count = this.balls.length
      while (count--) {
        let ball = this.balls[count]
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect()
          let x = rect.left - 32
          let y = -(window.innerHeight - rect.top - 22)
          el.style.display = ''
          el.style.webkitTransform = `translate3d(0,${y}px,0)`
          el.style.transform = `translate3d(0,${y}px,0)`
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`
          inner.style.transform = `translate3d(${x}px,0,0)`
        }
      }
    },
    // 此回调函数是可选项的设置
    // 与 CSS 结合时使用
    enter (el, done) {
      /* eslint-disable no-unused-vars */
      let rf = el.offsetHeight // 触发浏览器重绘
      this.$nextTick(() => {
        el.style.webkitTransform = `translate3d(0,0,0)`
        el.style.transform = `translate3d(0,0,0)`
        let inner = el.getElementsByClassName(`inner-hook`)[0]
        inner.style.webkitTransform = `translate3d(0,0,0)`
        inner.style.transform = `translate3d(0,0,0)`
        el.addEventListener('transitionend', done)
      })
      // done()
    },
    afterEnter (el) {
      // ...
      el.style.display = 'none'
      let ball = this.dropBalls.shift()
      ball.show = false
      ball.el = null
    },
    toggleList () {
      if (!this.totalCount) {
        return
      }
      this.fold = !this.fold
    },
    empty () {
      this.selectFoods.forEach((ele,index) => {
        ele.count = 0
      })
    },
    hiddenList () {
      this.fold = !this.fold
    },
    pay () {
      if (this.totalPrice < this.minPrice) {
        return
      }
      alert(`支付${this.totalPrice}元`)
    }
  }, // shopcart.vue组件
  components: {
    cartcontrol
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
      .inner{
        width:16px;
        height: 16px;
        border-radius: 50%;
        background-color: rgb(0,160,220);
        transition: all 1s linear;
      }
      &.drop-enter-active {
        transition: all 1s cubic-bezier(0.49, -0.29, 0.75, 0.41);
      }
    }
  }
  .shopCart-list{
    position: absolute;
    left:0;
    top:0;
    z-index:-1;
    width:100%;
    transform: translate3d(0,-100%,0);
    &.act-enter-active,.act-leave-active {
      transition: all .5s;
    }
    &.act-enter,.act-leave-to /* .fade-leave-active below version 2.1.8 */ {
      transform: translate3d(0,0,0);
    }
    .list-header{
      height:40px;
      line-height:40px;
      padding:0 18px;
      background-color: #f3f5f7;
      .title{
        float: left;
        font-size: 12px;
        color: rgb(7,17,27);
      }
      .empty{
        float:right;
        font-size: 12px;
        color: rgb(0,160,220);
      }
    }
    .list-content{
      padding:0 18px;
      max-height:217px;
      background-color: white;
      overflow: hidden;
      .food{
        position: relative;
        padding:12px 0;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        .name{
          line-height:24px;
          font-size:14px;
          color: rgb(7,17,27);
        }
        .price{
          position:absolute;
          right:90px;
          bottom:12px;
          line-height:24px;
          font-weight:700;
          font-size:14px;
          color: red;
        }
        .control-wrapper{
          position: absolute;
          right:0;
          bottom:0px;
        }
      }
    }
  }

}
  .list-mark{
    position: fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    z-index: 40;
    background-color: rgba(7,17,27,0.6);
    /*iphone 下的效果 模糊*/
    backdrop-filter:blur(10px);
    &.fade-enter-active,.fade-leave-active {
      opacity: 1;
    }
    &.fade-enter,.fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
      background-color: rgba(7,17,27,0);
    }
  }
</style>

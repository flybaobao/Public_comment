<template>
<div class="button-control">
  <transition name="bounce">
    <div class="cart-decrease" v-show="food.count" @click="decreaseClick">
      <span class="icon-remove_circle_outline"></span>
    </div>
  </transition>
  <div class="count" v-show="food.count">{{food.count}}</div>
  <div class="cart-add icon-add_circle" @click="addClick"></div>
  <div></div>
</div>
</template>

<script>
import Vue from 'vue'
export default {
  data () {
    return {}
  },
  props: ['food'],
  created () {
  },
  mounted () {
  },
  methods: {
    addClick () {
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
    },
    decreaseClick () {
      if (this.food.count) {
        this.food.count--
      }
    }
  }
}
</script>

<style lang="less" scoped="scoped">
@import '../../common/css/icon.css';
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
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
.button-control{
  font-size: 0;
  .cart-decrease{
    display:inline-block;
    padding: 6px;
    .icon-remove_circle_outline{
      line-height: 24px;
      font-size: 24px;
      color:rgb(0,160,220);
    }
  }
  .count{
    display:inline-block;
    color: #000;
    width:12px;
    line-height: 24px;
    padding-top:6px;
    text-align: center;
    font-size:10px;
    vertical-align: top;
  }
  .cart-add{
    display:inline-block;
    padding: 6px;
    line-height: 24px;
    font-size: 24px;
    color:rgb(0,160,220);
  }
}
</style>

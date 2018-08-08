<template>
<div class="button-control">
  <div class="cart-decrease" v-show="food.count"><span class="icon-remove_circle_outline"></span></div>
  <div class="count" v-show="food.count">{{food.count}}</div>
  <div class="cart-add">
    <span class="icon-add_circle"></span>
  </div>
  <div></div>
</div>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: ['food'],
  created () {
    console.log(this.food)
  },
  mounted () {

  }
}
</script>

<style lang="less" scoped="scoped">

  @import '../../common/css/icon.css';
.button-control{

}
</style>

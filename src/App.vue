<template>
  <div class="app-index">
    <headers :seller="seller"></headers>
    <div class="tab vux-1px-b">
      <router-link :to="{path:'/goods'}" class="goods-tab tab-bar">商品</router-link>
      <router-link :to="{path:'/ratings'}" class="ratings-tab tab-bar">评论</router-link>
      <router-link :to="{path:'/seller'}" class="seller-tab tab-bar">商家</router-link>
    </div>
    <div id="app">
      <router-view/>
    </div>
  </div>

</template>

<script>

import Header from '@/components/header/header'
export default {
  name: 'App',
  data () {
    return {
      seller: {},
      goods: {},
      ratings: {}
    }
  },
  components: {
    headers: Header
  },
  created () {
    this.$http.get('/api/ratings').then((res) => {
      if (res.body.errno === 0) {
        this.ratings = res.body.data
      }
    })
    this.$http.get('/api/seller').then((res) => {
      if (res.body.errno === 0) {
        this.seller = res.body.data
      }
    })
  }
}
</script>

<style lang="less" >
@import '~vux/src/styles/1px.less';

.app-index {

  .tab{
    width:100%;
    height:40px;
    font-size: 14px;
    display: flex;
    .tab-bar{
      flex: 1;
      color: rgb(77,85,93);
      text-align: center;
      line-height: 40px;
      text-decoration: none;
    }
    .router-link-active{
      color: rgb(240,20,20);
    }
  }
}
</style>

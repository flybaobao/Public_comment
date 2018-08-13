<template>
  <div class="app-index">
    <headers :seller="seller"></headers>
    <div class="tab vux-1px-b">
      <router-link :to="{path:'/goods'}" class="goods-tab tab-bar">商品</router-link>
      <router-link :to="{path:'/ratings'}" class="ratings-tab tab-bar">评论</router-link>
      <router-link :to="{path:'/seller'}" class="seller-tab tab-bar">商家</router-link>
    </div>
    <div id="app">
      <router-view :seller="seller"/>
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
    this.$http.get('http://121.40.171.1:8080/mockjsdata/39/api').then((res) => {
      this.ratings = res.body.ratings
      //      console.log(res)
    })
    this.$http.get('http://121.40.171.1:8080/mockjsdata/39/api').then((res) => {
      this.seller = res.body.seller
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

<template>
  <div class="goods" v-if="goods">
    <div class="menu-wrapper" ref="mrapper">
      <ul >
        <li class="menu-item" v-for="(item, index) in goods" :key="index">
          <span class="text vux-1px-b">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="frapper">
      <ul>
        <li v-for="(item, index) in goods" class="food-list" :key="index">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="(food, indexs) in item.foods" class="food-item  vux-1px-b" :key="indexs">
              <div class="icon">
                <img :src="food.icon" alt="" width="100%" height="100%">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc text-style" v-if="food.description">{{food.description}}</p>
                <div class="extra text-style">
                  <span class="sellCount">月售{{food.sellCount}}</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="newPrice">¥{{food.price}}</span>
                  <span class="oldPrice" v-if="food.oldPrice">¥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  data () {
    return {
      goods: {}
    }
  },
  props: {
    seller: {
      type: Object
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    this.$http.get('/api/goods').then((res) => {
      if (res.body.errno === 0) {
        this.goods = res.body.data
        this.$nextTick(() => {
          this._innitScroll()
        })
      }
    })
  },
  methods: {
    _innitScroll () {
      console.log(this.$refs.mrapper)
      this.meunScroll = new BScroll(this.$refs.mrapper, {})
      this.foodScroll = new BScroll(this.$refs.frapper, {})
    }
  }
}
</script>

<style lang="less" scoped="scoped">
@import '../../common/less/mixin.less';
  .goods{
    position: absolute;
    top:174px;
    bottom:46px;
    width:100%;
    display:flex;
    overflow: hidden;
    .menu-wrapper{
      flex:0 0 80px;
      width:80px;
      background-color: #f3f5f7;
      .menu-item {
        display: table;
        padding:0 12px;
        width: 56px;
        height: 54px;
        line-height: 14px;
        font-size: 12px;
        .icon {
          display: inline-block;
          width: 12px;
          height: 12px;
          margin-right: 2px;
          background-size: 12px 12px;
          background-repeat: no-repeat;
          vertical-align: top;
          margin-top: 1px;
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
          display: table-cell;
          width:56px;
          vertical-align: middle;
          font-size: 12px;
          margin: auto;
        }
      }
    }
    .foods-wrapper{
      flex: 1;
      .title{
        padding-left:14px;
        font-size:12px;
        color:rgb(147,153,159);
        line-height:26px;
        border-left: 2px solid #d9dde1;
        background-color: #f3f5f7;
      }
      .food-item{
        display: flex;
        margin: 18px;
        padding-bottom: 18px;
        &:last-child{
          border:none;
          pdding-bottom:0;
          margin-bottom: 0;
        }
        .icon{
          flex:0 0 57px;
          width:57px;
          height:57px;
          margin-right: 10px;
        }
        .content{
          flex:1;
          font-size:0;
          .name{
            font-size: 14px;
            color: rgb(7,17,27);
            height:14px;
            line-height:14px;
            margin:2px 0 8px 0;
          }
          .text-style{
            font-size:10px;
            color: rgb(147,153,159);
            height:10px;
            line-height:10px;
          }
          .extra{
            margin: 8px 0;
            font-size: 10px;
            .sellCount{
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
      }
    }
  }
</style>

<template>
  <div class="goods" v-if="goods">
    <div class="menu-wrapper" ref="mrapper">
      <ul >
        <li class="menu-item" v-for="(item, index) in goods" :key="index" :class="{'current':currentIndex===index}" @click="selectMenu(index)">
          <span class="vux-1px-b text">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="frapper">
      <ul>
        <li v-for="(item, index) in goods" class="food-list food-list-hook" :key="index">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="(food, indexs) in item.foods" class="food-item  vux-1px-b" :key="indexs">
              <div class="icon">
                <img :src="food.icon" alt="" width="100%" height="100%">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <div class="desc text-style" v-if="food.description">{{food.description}}</div>
                <div class="extra text-style">
                  <span class="sellCount">月售{{food.sellCount}}</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="newPrice">¥{{food.price}}</span>
                  <span class="oldPrice" v-if="food.oldPrice">¥{{food.oldPrice}}</span>
                </div>
                <div class="control-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" :selectFoods="selectFoods" v-if="seller"></shopcart>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import shopcart from '../shopcart/shopcart'
import cartcontrol from '../buttonControl/buttonControl'
export default {
  components: {
    shopcart,
    cartcontrol
  },
  data () {
    return {
      goods: [],
      scrollY: 0,
      listHeight: [],
      count: 11
    }
  },
  props: {
    seller: {
      type: Object
    }
  },
  computed: {
    currentIndex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i
        }
      }
      return 0
    },
    // 计算价格
    selectFoods () {
      let foods = []
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food)
          }
        })
      })
      return foods
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    this.$http.get('/api/goods').then((res) => {
      if (res.body.errno === 0) {
        this.goods = res.body.data
        this.$nextTick(() => {
          this._innitScroll()
          this._calculateHeight()
        })
      }
    })
  },
  methods: {
    selectMenu (index) {
      let foodList = this.$refs.frapper.getElementsByClassName('food-list-hook')
      let el = foodList[index]
      this.foodScroll.scrollToElement(el, 300)
    },
    _innitScroll () {
      this.meunScroll = new BScroll(this.$refs.mrapper, {
        click: true
      })
      this.foodScroll = new BScroll(this.$refs.frapper, {
        click: true,
        probeType: 3 // 实时监听滚动
      })
      this.foodScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    _calculateHeight () {
      let foodList = this.$refs.frapper.getElementsByClassName('food-list-hook')
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
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
        &.current{
          position: relative;
          z-index: 10;
          background-color: white;
          font-size:12px;
          margin-top: -1px;
          font-weight: 700;
          .vux-1px-b:after{
            border:none !important;
          }
        }
        &:last-child{
          .vux-1px-b:after{
            border:none !important;
          }
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
          &.vux-1px-b:after{
            border:none !important;
          }
          border:none;
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
          .desc{

          }
          .text-style{
            font-size:10px;
            color: rgb(147,153,159);
            line-height:15px;
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
          .control-wrapper{
            position: absolute;
            right:0;
            bottom:12px;
          }
        }
      }
    }
  }
</style>

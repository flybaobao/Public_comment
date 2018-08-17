<template>
  <div class="ratings" ref="ratingscr">
    <div class="ratings-content">
      <div class="over-view">
        <div class="view-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="view-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <div class="star">
              <stars :size="36" :score="seller.serviceScore"></stars>
            </div>

            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <div class="star"><stars :size="36" :score="seller.foodScore"></stars></div>

            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect  @select-type-one="selectTypeOne" @select-type-two="selectTypeTwo" :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="ratings"></ratingselect>
      <div class="rating-wrapper">
        <ul>
          <li class="rating-item vux-1px-b" v-for="(item, index) in ratings" :key="index">
            <div class="avatar">
              <img :src="item.avatar" alt="">
            </div>
            <div class="content">
              <h1 class="name">{{item.username}}</h1>
              <div class="star-wrapper">
                  <stars class="stars" :size="24" :score="item.score"></stars>
                <span class="delivery" v-show="item.deliveryTime">{{item.deliveryTime}}分钟送达</span>
              </div>
              <p class="text">{{item.text}}</p>
              <div class="recommend" v-show="item.recommend">
                <span class="point float-l" :class="{'icon-thumb_up':item.rateType === 0, 'icon-thumb_down':item.rateType === 1}"></span>
                <span class="space-food vux-1px float-l" v-show="item.recommend && item.recommend.length" v-for="(food, index) in item.recommend" :key="index">
                  {{food}}
                </span>
              </div>
              <div class="call-time">{{item.rateTime | formatDate}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import stars from '../stars/stars'
import split from '../split/split'
import ratingselect from '../ratingselect/ratingselect'
// import api from '@/common/js/api'
import BScroll from 'better-scroll'
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
        pos: '满意',
        neg: '不满意'
      }
    }
  },
  mounted () {
    this._innitScroll()
  },
  props: {
    seller: {
      type: Object
    },
    ratings: {
      type: Array
    }
  },
  components: {
    stars,
    split,
    ratingselect
  },
  methods: {
    _innitScroll () {
      this.meunScroll = new BScroll(this.$refs.ratingscr, {
        click: true
      })
    },
    selectTypeOne (el) {
      this.selectType = el
      console.log(this.ratings)
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
  @import '~vux/src/styles/1px.less';
  @import "../../common/css/icon.css";
  .ratings{
    position: absolute;
    top:174px;
    bottom:0;
    left:0;
    width:100%;
    overflow: hidden;
    .ratings-content{
      .over-view{
        display: flex;
        padding:18px 0;
        .view-left{
          flex:0 0 137px;
          padding: 6px 0;
          width:137px;
          border-right:1px solid rgba(7,17,27,0.2);
          text-align: center;
          @media only screen and (max-width: 320px){
            flex: 0 0 110px;
            width: 10px;
          }
          .score{
            margin-bottom:6px;
            line-height:28px;
            font-size:24px;
            color: rgb(255,153,0);
          }
          .title{
            margin-bottom: 8px;
            line-height:12px;
            font-size:12px;
            color: rgb(7,17,27);
          }
          .rank{
            line-height:10px;
            font-size:10px;
            color: rgb(147,153,159);
          }
        }
        .view-right{
          flex:1;
          padding:6px 0 6px 24px;
          @media only screen and (max-width: 320px){
            padding-left: 5px;
          }
          .score-wrapper{
            margin-bottom:8px;
            font-size:0;
            .title{
              line-height:18px;
              font-size:12px;
              color: rgb(7,17,27);
            }
            .star{
              display: inline-block;
              margin:0 12px;
              vertical-align: top;
            }
            .score{
              line-height:18px;
              display: inline-block;
              vertical-align: top;
              font-size: 12px;
              color: rgb(255,153,0);
            }
          }
          .delivery-wrapper{
            font-size:0;
            .title{
              line-height:18px;
              font-size:12px;
              color: rgb(7,17,27);
            }
            .delivery{
              margin-left:17px;
              font-size: 10px;
              color: rgb(147,153,159);
            }
          }
        }
      }
      .rating-wrapper{
        padding:0 18px;
        .rating-item{
          display: flex;
          padding:18px 0;
          .avatar{
            flex:0 0 28px;
            width:28px;
            img{
              width:28px;
              height:28px;
              border-radius: 50%;
            }
          }
          .content{
            flex: 1;
            margin-left: 12px;
            position: relative;
            .name{
              line-height:12px;
              font-size:10px;
              color: rgb(7,17,27);
            }
            .star-wrapper{
              margin: 4px 0 6px 0;
              .stars{
                display: inline-block;
              }
              .delivery{
                display: inline-block;
                line-height:12px;
                margin-left: 6px;
                font-size:10px;
                font-weight: 200;
                color: rgb(147,153,159);
              }
            }
            .text{
              line-height:18px;
              margin-bottom: 8px;
              color: rgb(7,17,27);
              font-size:12px;
            }
            .recommend{
              .float-l{float: left}
              .point{
                line-height:16px;
                font-size:12px;
              }
              .icon-thumb_up{
                color: rgb(0,160,220);
              }
              .icon-thumb_down{
                color:rgb(183,187,191);
              }
              .space-food{
                padding:0 6px;
                margin-left: 8px;
                margin-bottom: 2px;
                border-color: rgb(7,17,27);
                border-radius: 2px;
                background-color: rgb(255,255,255);
                line-height:16px;
                font-size: 9px;
                color: rgb(147,153,159);
              }
            }
            .call-time{
              position: absolute;
              right:0;
              top:0;
              line-height:12px;
              font-size:10px;
              font-weight:200px;
              color: rgb(147,153,159);
            }
          }
        }
      }
    }
  }
</style>

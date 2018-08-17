<template>
  <div class="rating-select">
    <div class="rating-type vux-1px-b">
      <span @click="select({'num': 2, 'data': ratings})" class="block pos" :class="{'active': selectType === 2}">{{desc.all}} <span class="count">{{ratings.length}}</span></span>
      <span @click="select({'num': 0, 'data': positives})" class="block pos" :class="{'active': selectType === 0}">{{desc.pos}} <span class="count">{{positives.length}}</span></span>
      <span @click="select({'num': 1, 'data': negatives})" class="block neg" :class="{'active': selectType === 1}">{{desc.neg}} <span class="count">{{negatives.length}}</span></span>
    </div>
    <div @click="toggleContent" class="switch" :class="{'on': onlyContent}">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
const POS = 0
const NEG = 1
const ALL = 2
export default {
  data () {
    return {}
  },
  props: {
    ratings: {
      type: Array,
      default () {
        return []
      }
    },
    selectType: {
      type: Number,
      default: ALL
    },
    onlyContent: {
      type: Boolean,
      default: false
    },
    desc: {
      type: Object,
      default () {
        return {
          all: '全部',
          pos: '满意',
          neg: '不满意'
        }
      }
    }
  },
  methods: {
    select (num) {
      this.$emit('select-type-one', num)
    },
    toggleContent () {
      // this.onlyContent = !this.onlyContent
      this.$emit('select-type-two', {'fig': !this.onlyContent, 'nullRatings': this.nullRatings, 'fullRatings': this.fullRatings})
    }
  },
  computed: {
    positives () {
      return this.ratings.filter((rating) => {
        return rating.rateType === POS
      })
    },
    negatives () {
      return this.ratings.filter((rating) => {
        return rating.rateType === NEG
      })
    },
    nullRatings () {
      return this.ratings.filter((rating) => {
        return rating.text === ''
      })
    },
    fullRatings () {
      return this.ratings.filter((rating) => {
        return rating.text !== ''
      })
    }
  }
}
</script>

<style lang="less" scoped="scoped">
  @import '~vux/src/styles/1px.less';
  @import "../../common/css/icon.css";
  .rating-select{
    .rating-type{
      padding:18px 0 ;
      margin: 0 18px;
      font-size:0;
      .block{
        display: inline-block;
        padding:8px 12px;
        font-size:12px;
        border-radius: 2px;
        margin-right:8px;
        color: rgb(77,85,93);
        line-height: 16px;
        &.active{
          color: #ffffff;
        }
        &.pos{
          background-color: rgba(0,160,220,0.2);
          &.active{
            background-color: rgb(0,160,220);
          }
        }
        &.neg{
          background-color: rgba(77,89,93,0.2);
          &.active{
            background-color: rgb(77,89,93);
          }
        }
        .count{
          margin-left:2px;
          font-size:8px;
        }
      }
    }
    .switch{
      padding:12px 18px;
      line-height:24px;
      font-size:0;
      border-bottom: 1px solid rgba(7,17,27,0.1);
      color: rgb(147,153,159);
      &.on{
        .icon-check_circle{
          color: lawngreen;
        }
      }
      .icon-check_circle{
        display: inline-block;
        vertical-align: top;
        margin-right:4px;
        font-size:24px;
      }
      .text{
        display: inline-block;
        vertical-align: top;
        font-size:12px;
      }
    }
  }
</style>

<template>
  <div class="stars" :class="starType">
    <span v-for="(itemClass , index) in itemClasses" :class="itemClass" class="star-item" :key="index"></span>
  </div>
</template>

<script>
const Length = 5
const CLS_ON = 'on'
const CLS_OFF = 'off'
const CLS_HALF = 'half'

export default {
  data () {
    return {}
  },
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  computed: {
    starType () {
      return 'star-' + this.size
    },
    itemClasses () {
      let result = []
      let score = Math.floor(this.score * 2) / 2
      let hasDecimal = score % 1 !== 0
      let integer = Math.floor(score)
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON)
      }
      if (hasDecimal) {
        result.push(CLS_HALF)
      }
      while (result.length < Length) {
        result.push(CLS_OFF)
      }
      return result
    }
  }
}
</script>

<style lang="less" scoped="scoped">

  @import '../../common/less/mixin.less';
  .stars{
    .star-item{
      display: inline-block;
      background-repeat: no-repeat;
    }
    &.star-48{
      .star-item{
        width: 20px;
        height:20px;
        margin-right: 22px;
        background-size: 20px 20px;
        &.on{
          .bg-img('../../components/stars/images/star48_on');
        }
        &.half{
          .bg-img('../../components/stars/images/star48_half');
        }
        &.off{
          .bg-img('../../components/stars/images/star48_off');
        }
      }
    }
    &.star-36{
      .star-item{
        width: 15px;
        height:15px;
        margin-right: 6px;
        background-size: 15px 15px;
        &.on{
          .bg-img('../../components/stars/images/star36_on');
        }
        &.half{
          .bg-img('../../components/stars/images/star36_half');
        }
        &.off{
          .bg-img('../../components/stars/images/star36_off');
        }
      }
    }
    &.star-24{
      .star-item{
        width: 10px;
        height:10px;
        margin-right: 3px;
        background-size: 10px 10px;
        &.on{
          .bg-img('../../components/stars/images/star24_on');
        }
        &.half{
          .bg-img('../../components/stars/images/star24_half');
        }
        &.off{
          .bg-img('../../components/stars/images/star24_off');
        }
      }
    }
  }
</style>

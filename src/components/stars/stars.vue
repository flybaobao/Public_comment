<template>
  <div class="stars" :class="starType">
    <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
  </div>
</template>

<script>
export default {
  data() {
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
    }
  }
}
</script>

<style lang="less" scoped="scoped">
  .stars{
    .star-item{
      display: inline-block;
      background-repeat: no-repeat;
    }
    &.star-48{
      .star-item{

      }
    }
    &.star-36{
      .star-item{

      }
    }
    &.star-24{
      .star-item{

      }
    }
  }
</style>

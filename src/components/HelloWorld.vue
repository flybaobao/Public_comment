<template>
  <div class="about">
    <headers></headers>
    <a href="#">从about跳转到demo1</a>{{msg}}
    <group>
      <cell title="title" ></cell>
    </group>
  </div>
</template>

<script>
import {Group, Cell} from 'vux'
import Header from '@/components/header/header'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    Group,
    Cell,
    headers: Header
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

import Vue from 'vue'
import Router from 'vue-router'
import Ratings from '@/components/ratings/ratings'
import Seller from '@/components/seller/seller'
import Goods from '@/components/goods/goods'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'good',
      component: Goods
    },
    {
      path: '/goods',
      name: 'goods',
      component: Goods
    },
    {
      path: '/seller',
      name: 'seller',
      component: Seller
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: Ratings
    }
  ]
})

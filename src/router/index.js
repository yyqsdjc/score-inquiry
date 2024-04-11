import Vue from 'vue'
import VueRouter from 'vue-router'

import Eligibility from '../views/eligibility'
import Qualified from '../views/qualified'
import Score from '../views/score'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Home,
      redirect: '/eligibility',
      children: [
        { path: '/eligibility', component: Eligibility },
        { path: '/qualified', component: Qualified },
        { path: '/score', component: Score }
      ]
    }
  ]
})

export default router

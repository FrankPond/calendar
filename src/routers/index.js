import Vue from 'vue'
import Router from 'vue-router'

import calendarRouter from './calendar'
import todayRouter from './today'
import moreRouter from './more'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    calendarRouter,
    todayRouter,
    moreRouter,
    {
      //默认路由
      path : '/*',
      redirect : '/calendar'
    }
  ]
})

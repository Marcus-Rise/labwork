import Vue from 'vue'
import Router from 'vue-router'
import Index from "@/views/Index.vue";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/testing',
      name: 'testing',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "testing" */ '@/views/Testing.vue')
    },{
      path: '/theory',
      name: 'theory',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "theory" */ './views/Theory.vue')
    },{
      path: '/labwork',
      name: 'labwork',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "labwork" */ './views/Labwork.vue')
    }, {
      path: '/labwork2',
      name: 'labwork2',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "labwork2" */ './views/Labwork2.vue')
    }
  ]
})

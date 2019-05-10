import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Intro from './views/Introduction.vue'
import PlastidDB from './views/PlastidDB.vue'
import MitoDB from './views/MitoDB.vue'
import HowTo from './views/HowTo.vue'
import Vis from './views/Visualization/index.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { selector: to.hash }
    }
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/',
      name: 'index',
      component: Home,
      meta: {
        title: 'VDOG: Visual Database for Organelle Genome'
      }
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        title: 'VDOG: Visual Database for Organelle Genome'
      }
    },
    {
      path: '/plastid',
      name: 'plastidDB',
      component: PlastidDB,
      meta: {
        title: 'plastidDB: The genome database for plastid'
      }
    },
    {
      path: '/howto',
      name: 'howto',
      component: HowTo,
      meta: {
        title: 'VDOG: How to Use'
      }
    },
    {
      path: '/mito',
      name: 'mitoDB',
      component: MitoDB,
      meta: {
        title: 'mitoDB: The genome database for mitochondrion'
      }
    },
    {
      path: '/intro',
      name: 'intro',
      component: Intro,
      meta: {
        title: 'VDOG: Introduction'
      }
    },
    {
      path: '/vis/:type',
      name: 'visualization',
      component: Vis,
      props: true,
      meta: {
        title: 'Database Visualization: '
      }
    },
  ]
})

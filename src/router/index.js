import Vue from "vue";
import Router from "vue-router";
import Home from "@/page/home";
import musicPage from "../components/music/music.vue"
import resultPage from "../components/result/result.vue"
import LuckPanel from "../components/paomadeng/index.vue"
import load from '../components/load.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/musicPage',
      name: 'musicPage',
      component: musicPage
    },
    {
      path: '/resultPage/:gradeNum',
      name: 'resultPage',
      component: resultPage
    },
    {
      path:'/LuckPanel',
      name: 'LuckPanel',
      component: LuckPanel
    }
  ]
})

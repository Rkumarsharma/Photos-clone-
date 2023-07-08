import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home';
import Dashboard from '../views/Dashboard';
Vue.use(VueRouter)

const routes = [
  {
    "name":"Home",
    "path":"/",
    "component":Home,
  },
  {
    "name":"Dashboard",
    "path":"/dashboard",
    "component":Dashboard
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

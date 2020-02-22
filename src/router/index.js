import Vue from "vue"
import VueRouter from "vue-router"
import axios from "axios"
import TheLogin from "../views/TheLogin.vue"
import TheDashboard from "../views/TheDashboard.vue"
import TheDashboardProducts from "../views/TheDashboardProducts.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "*",
    redirect: "login"
  },
  {
    path: "/",
    name: "TheDashboard",
    component: TheDashboard,
    meta: { requiresAuth: true }
  },
  {
    path: "/login",
    name: "TheLogin",
    component: TheLogin
  },
  {
    path: "/admin",
    name: "TheDashboard",
    component: TheDashboard,
    children: [
      {
        path: "products",
        name: "TheDashboardProducts",
        component: TheDashboardProducts,
        meta: { requiresAuth: true }
      }
    ]
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`
    axios.post(api).then(response => {
      //console.log(response.data)
      if (response.data.success) {
        next()
      } else {
        next({
          path: "/login"
        })
      }
    })
  } else {
    next()
  }
})

export default router

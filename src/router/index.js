import Vue from "vue"
import VueRouter from "vue-router"
import axios from "axios"
import TheLogin from "../views/TheLogin.vue"
import TheDashboard from "../views/TheDashboard.vue"
import TheDashboardProducts from "../views/TheDashboardProducts.vue"
import TheDashboardOrders from "../views/TheDashboardOrders.vue"
import TheDashboardCoupons from "../views/TheDashboardCoupons.vue"
import TheCustomerOrder from "../views/TheCustomerOrder.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "*",
    redirect: "login"
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
        meta: { requiresAuth: false } // 正式上線改成 true
      },
      {
        path: "orders",
        name: "TheDashboardOrders",
        component: TheDashboardOrders,
        meta: { requiresAuth: false }
      },
      {
        path: "coupons",
        name: "TheDashboardCoupons",
        component: TheDashboardCoupons,
        meta: { requiresAuth: false }
      }
    ]
  },
  {
    path: "/",
    name: "TheDashboard",
    component: TheDashboard,
    children: [
      {
        path: "customer_order",
        name: "TheCustomerOrder",
        component: TheCustomerOrder
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

import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import TheLogin from '../views/TheLogin.vue'

import TheDashboard from '../views/TheDashboard.vue'
import TheDashboardProducts from '../views/TheDashboardProducts.vue'
import TheDashboardOrders from '../views/TheDashboardOrders.vue'
import TheDashboardCoupons from '../views/TheDashboardCoupons.vue'

import TheCustomer from '../views/TheCustomer.vue'
import TheCustomerCheckout from '../views/TheCustomerCheckout.vue'
import TheCustomerContent from '../views/TheCustomerContent.vue'
import TheCustomerContentFavor from '../views/TheCustomerContentFavor.vue'
import TheCustomerContentCoupon from '../views/TheCustomerContentCoupon.vue'
import TheCustomerContentProductDetail from '../views/TheCustomerContentProductDetail.vue'
import TheCustomerShoppingCartContent from '../views/TheCustomerShoppingCartContent'
import TheCustomerShoppingCartForm from '../views/TheCustomerShoppingCartForm.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: 'login'
  },
  {
    path: '/login',
    name: 'TheLogin',
    component: TheLogin
  },
  {
    path: '/admin',
    name: 'TheDashboard',
    component: TheDashboard,
    children: [
      {
        path: 'products',
        name: 'TheDashboardProducts',
        component: TheDashboardProducts
      },
      {
        path: 'orders',
        name: 'TheDashboardOrders',
        component: TheDashboardOrders
      },
      {
        path: 'coupons',
        name: 'TheDashboardCoupons',
        component: TheDashboardCoupons
      }
    ]
  },
  {
    path: '/',
    name: 'TheCustomer',
    component: TheCustomer,
    children: [
      {
        path: '',
        name: 'TheCustomerContent',
        component: TheCustomerContent
      },
      {
        path: 'detail/:productId',
        name: 'TheCustomerContentProductDetail',
        component: TheCustomerContentProductDetail
      },
      {
        path: 'favor',
        name: 'TheCustomerContentFavor',
        component: TheCustomerContentFavor
      },
      {
        path: 'coupon',
        name: 'TheCustomerContentCoupon',
        component: TheCustomerContentCoupon
      },
      {
        path: 'customer_carts',
        name: 'TheCustomerShoppingCartContent',
        component: TheCustomerShoppingCartContent
      },
      {
        path: 'customer_carts_form',
        name: 'TheCustomerShoppingCartForm',
        component: TheCustomerShoppingCartForm
      },
      {
        path: 'customer_checkout/:orderId',
        name: 'TheCustomerCheckout',
        component: TheCustomerCheckout
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`
    axios.post(api).then(response => {
      if (response.data.success) {
        next()
      } else {
        next({
          path: '/login'
        })
      }
    })
  } else {
    next()
  }
})

export default router

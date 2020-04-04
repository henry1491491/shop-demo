import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from '../store'

Vue.use(VueAxios, axios)

axios.defaults.baseURL = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}`

axios.defaults.withCredentials = true

// Log
const LogRequest = axios.create({
  baseURL: `${process.env.VUE_APP_APIPATH}`
})

const DefaultRequest = axios.create({
  baseURL: `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}`
})

const NotLoadingRequest = axios.create({
  baseURL: `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}`
})

// Log
export const apiLogLogin = data => LogRequest.post('/admin/signin', data)
export const apiLogLogout = () => LogRequest.post('/logout')

// Admin
export const apiAdminUploadFile = (data, header) =>
  DefaultRequest.post('/admin/upload', data, header)

// Customer
export const apiAdminGetProducts = data =>
  DefaultRequest.get(`/admin/products?page=${data}`)

export const apiAdminDeleteProduct = data =>
  DefaultRequest.delete(`/admin/product/${data.id}`)

export const apiAdminGetOrders = data =>
  DefaultRequest.get(`/admin/orders?page=${data}`)

export const apiAdminGetCoupons = data => {
  return DefaultRequest.get(`/admin/coupons?page=${data}`)
}

export const apiAdminDeleteCoupons = data =>
  DefaultRequest.delete(`/admin/coupon/${data.id}`)

export const apiCustomerGetOrder = data => DefaultRequest.get(`/order/${data}`)

export const apiCustomerPayOrder = data => DefaultRequest.post(`/pay/${data}`)

export const apiCustomerGetProduct = data =>
  NotLoadingRequest.get(`/product/${data}`)

export const apiCustomerRemoveCart = data =>
  NotLoadingRequest.delete(`/cart/${data}`)

export const apiCustomerAddCouponCode = data =>
  DefaultRequest.post('/coupon', data)

export const apiCustomerCreateOrder = data =>
  DefaultRequest.post('/order', data)

// store / customer

export const apiGetCart = () => NotLoadingRequest.get('/cart')

export const apiAddToCart = data => NotLoadingRequest.post('/cart', data)

export const getProductsAll = () => DefaultRequest.get('/products/all')

DefaultRequest.interceptors.request.use(
  config => {
    store.dispatch('setLoading', true)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

DefaultRequest.interceptors.response.use(
  response => {
    store.dispatch('setLoading', false)
    return response
  },
  error => {
    store.dispatch('setLoading', false)
    return Promise.reject(error)
  }
)

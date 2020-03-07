import Vue from "vue"
import axios from "axios"
import VueAxios from "vue-axios"
import store from "../store"

Vue.use(VueAxios, axios)

axios.defaults.baseURL = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}`

axios.defaults.withCredentials = true

axios.interceptors.request.use(
  config => {
    store.dispatch("setLoading", true)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    store.dispatch("setLoading", false)
    return response
  },
  error => {
    store.dispatch("setLoading", false)
    return Promise.reject(error)
  }
)

// Log
const LogRequest = axios.create({
  baseURL: `${process.env.VUE_APP_APIPATH}`
})
// Admin
const AdminRequest = axios.create({
  baseURL: `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}`
})
// Customer
const CustomerRequest = axios.create({
  baseURL: `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}`
})

// Log
export const apiLogLogin = data => LogRequest.post("/admin/signin", data)
export const apiLogLogout = () => LogRequest.post("/logout")

// Admin
export const apiAdminUploadFile = (data, header) =>
  AdminRequest.post("/admin/upload", data, header)

// Customer
export const apiAdminGetProducts = data =>
  CustomerRequest.get(`/admin/products?page=${data}`)

export const apiAdminDeleteProduct = data =>
  CustomerRequest.delete(`/admin/product/${data.id}`)

export const apiAdminGetOrders = data =>
  CustomerRequest.get(`/admin/orders?page=${data}`)

export const apiAdminGetCoupons = data =>
  CustomerRequest.get(`/admin/coupons?page=${data}`)

export const apiAdminDeleteCoupons = data =>
  CustomerRequest.delete(`/admin/coupon/${data.id}`)

export const apiCustomerGetOrder = data => CustomerRequest.get(`/order/${data}`)

export const apiCustomerPayOrder = data =>
  CustomerRequest.post(`/order/${data}`)

export const apiCustomerGetProduct = data =>
  CustomerRequest.get(`/product/${data}`)

export const apiCustomerRemoveCart = data =>
  CustomerRequest.delete(`/cart/${data}`)

export const apiCustomerAddCouponCode = data =>
  CustomerRequest.post(`/coupon`, data)

export const apiCustomerCreateOrder = data =>
  CustomerRequest.post(`/order`, data)

// store / customer

export const apiGetCart = () => CustomerRequest.get(`/cart`)

export const apiAddToCart = data => CustomerRequest.post(`/cart`, data)

export const getProductsAll = () => CustomerRequest.get(`/products/all`)

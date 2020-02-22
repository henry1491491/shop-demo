import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import "./plugins/axios"
import "./plugins/bootstrap-vue"
import "./plugins/vee-validate"
import "./plugins/vue-content-loader"

Vue.config.productionTip = false

/**
 * 功能：
 * 1. 可加上 vee-validate
 *
 * Bugs:
 * 1. 解決登入帳號空格問題
 *
 * 優化：
 * 1. 封裝 axios 到一隻檔案
 * 2. vuex
 *
 * 學習：
 * 1. 瞭解 cookie 那部分，在登入頁面章節
 */

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")

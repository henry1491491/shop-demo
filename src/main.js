import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import currencyFilter from "./filters/currency"
import "./plugins/axios"
import "./plugins/bootstrap-vue"
import "./plugins/vee-validate"
import "./plugins/vue-content-loader"
import "./plugins/vue-material-design-icons"
import "./plugins/vue-moment"
import "./components/index"

Vue.filter("currency", currencyFilter)
Vue.config.productionTip = false

/**
 * 功能：
 * 1. 可加上 vee-validate => 已完成
 * 2. content-loading 自定義圖案  =>
 * 3. vue-loading-overlay 上傳檔案部分
 * 4. 修改訂單功能
 *
 * Bugs:
 * 1. 解決登入帳號空格問題 => 已解決
 * 2. 商品列表斷點
 * 3. pagination 組件最底頁但按鈕未 disable
 * 4. RWD
 * 5. 多筆同款項合併一個在購物車清單呈現
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

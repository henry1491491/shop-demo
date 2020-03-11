import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import currencyFilter from "./filters/currency"
import "./plugins/axios"
import "./plugins/bootstrap-vue"
import "./plugins/vee-validate"
import "./plugins/vue-material-design-icons"
import "./plugins/vue-moment"
import "./plugins/vue-loading-overlay"
import "./plugins/vuetify"
import "./components/index"
import "./utils/products-filter"

Vue.filter("currency", currencyFilter)
Vue.config.productionTip = false

/**
 * 功能：
 * 1. 可加上 vee-validate => 已完成
 * 2. content-loading 自定義圖案  => 已完成
 * 3. vue-loading-overlay 上傳檔案部分 ＝> 已完成
 * 4. 做排序 -> 第一步驟 category -> 第二再來進階篩選 => 已完成
 * 5. RWD
 *
 * Bugs:
 * 1. 解決登入帳號空格問題 => 已解決
 * 2. 商品列表斷點
 * 3. pagination 組件最底頁但按鈕未 disable
 * 4. favor 的 filter 功能
 * 6. Loading 部分重複、加上 request 數量，當 == 0 才停止 loading 效果
 * 7. 直接購買的地方不能直接 router.push，要先驗證購物車是否有東西
 * 8. 篩選的地方用統一的 methods
 * 9. 加到購物車數量預設值常常不ㄧ樣
 * 10. 控管篩選狀態有點混亂，最好有個統一指標
 *
 * 優化：
 * 1. 封裝 axios 到一隻檔案
 * 2. vuex
 * 3. 使用者體驗部分
 * 4. 右上角 carts 的部分可以簡潔一點
 * 5. axios 管理只做到 dashboard，還沒做到 customer 部分
 *
 *
 * 學習：
 * 1. 瞭解 cookie 那部分，在登入頁面章節
 * 2. 環境變數設定（開發、生產等不同版本之間差異）
 * 3. 模組化的地方
 * 4. 什麼時候需要包 try catch
 */

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")

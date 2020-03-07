import axios from "axios"
import { apiGetCart, apiAddToCart, getProductsAll } from "../../plugins/axios"

export default {
  namespaced: true,
  state: {
    carts: [],
    cartsTotal: {},
    category: "all",
    favorArray: [],
    filterProducts: [],
    priceZone: [],
    productsAll: [],
    sortTitle: "全部",
    status: {
      loadingItem: ""
    }
  },
  mutations: {
    GET_FAVORLIST(state) {
      state.favorArray = JSON.parse(localStorage.getItem("favorItem")) || []
    },
    SET_PRODUCTS_ALL(state, items) {
      state.productsAll = items
    },
    SET_STATUS_LOADINGITEM(state, id) {
      state.status.loadingItem = id
    },
    SET_SORTTITLE(state, item) {
      state.sortTitle = item
    },
    SET_CARTS(state, items) {
      state.carts = items
    },
    SET_CARTSTOTAL(state, item) {
      state.cartsTotal = item
    },
    SET_TO_FAVORLIST(state, item) {
      const isFavor = el => el === item.title
      //let favorStorage = JSON.parse(localStorage.getItem("favorItem")) || []
      // favorArray 沒有東西
      if (
        state.favorArray.length === 0 ||
        state.favorArray.some(isFavor) === false
      ) {
        if (item.title === null) return
        state.favorArray.push(item.title)
        localStorage.setItem("favorItem", JSON.stringify(state.favorArray))
        //favorStorage = JSON.parse(localStorage.getItem("favorItem")) || []
        state.favorArray = JSON.parse(localStorage.getItem("favorItem")) || []
      } else {
        let favorIndex = state.favorArray.findIndex(isFavor)
        state.favorArray.splice(favorIndex, 1)
        localStorage.setItem("favorItem", JSON.stringify(state.favorArray))
        //favorStorage = JSON.parse(localStorage.getItem("favorItem")) || []
        state.favorArray = JSON.parse(localStorage.getItem("favorItem")) || []
      }
    },
    SET_FILTERPRODUCTS_BY_SORT(state, item) {
      if (item === "hign") {
        state.filterProducts.sort((a, b) => {
          return b.price - a.price
        })
      } else if (item === "low") {
        state.filterProducts.sort((a, b) => {
          return a.price - b.price
        })
      }
    },
    UPDATE_FILTERPRODUCTS(state, item) {
      state.filterProducts = item
    }
  },
  actions: {
    addToCart({ commit, dispatch }, item) {
      commit("SET_STATUS_LOADINGITEM", item.id)
      const cart = {
        product_id: item.id,
        qty: item.qty
      }
      apiAddToCart({ data: cart }).then(() => {
        commit("SET_STATUS_LOADINGITEM", "")
        dispatch("getCart")
      })
    },
    getCart({ commit }) {
      apiGetCart().then(response => {
        commit("SET_CARTS", response.data.data.carts)
        commit("SET_CARTSTOTAL", {
          total: response.data.data.total,
          final_total: response.data.data.final_total
        })
      })
    },
    getProductsAll({ commit }) {
      getProductsAll().then(response => {
        commit("SET_PRODUCTS_ALL", response.data.products)
        commit("UPDATE_FILTERPRODUCTS", response.data.products)
      })
    }
  }
}

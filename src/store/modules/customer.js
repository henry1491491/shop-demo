import { apiGetCart, apiAddToCart, getProductsAll } from "../../plugins/axios"

export default {
  namespaced: true,
  state: {
    carts: [],
    cartsTotal: {},
    categories: [],
    filterProducts: [],
    order: {},
    priceZone: [],
    productsAll: [],
    sortTitle: "全部",
    status: {
      loadingItem: ""
    }
  },
  mutations: {
    SET_CARTS(state, items) {
      state.carts = items
    },
    SET_CARTS_TOTAL(state, item) {
      state.cartsTotal = item
    },
    SET_CATEGORIES(state) {
      if (!state.productsAll) return
      const setArray = Array.from(
        new Set(state.productsAll.map(el => el.category))
      )
      setArray.splice(0, 0, "全部")
      state.categories = setArray
    },
    SET_FILTER_PRODUCTS(state) {
      state.filterProducts = state.productsAll
    },
    SET_FILTER_PRODUCTS_BY_SORT(state, item) {
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
    SET_PRODUCTS_ALL(state, item) {
      state.productsAll = item
    },
    SET_SORT_TITLE(state, item) {
      state.sortTitle = item
    },
    SET_STATUS_LOADINGITEM(state, id) {
      state.status.loadingItem = id
    },
    SET_ORDER(state, item) {
      state.order = item
    },
    UPDATE_FILTER_PRODUCTS(state, item) {
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
    async getCart({ commit }) {
      try {
        let response = await apiGetCart()
        if (!response.data.success) return
        commit("SET_CARTS", response.data.data.carts)
        commit("SET_CARTS_TOTAL", {
          total: response.data.data.total,
          final_total: response.data.data.final_total
        })
        return { status: "success" }
      } catch (e) {
        console.log(e)
        return { status: "false" }
      }
    },
    async getProductsAll({ dispatch }) {
      let response = await getProductsAll()
      if (!response.data.success) return
      dispatch("initialize", response.data.products)
    },
    async initialize({ commit }, data) {
      commit("SET_PRODUCTS_ALL", data)
      commit("SET_FILTER_PRODUCTS", data)
      commit("SET_CATEGORIES")
    }
  }
}

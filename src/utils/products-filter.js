import Vue from "vue"

Vue.prototype.$productsFilter = {
  ProductFilters: {
    rangesFilter(products, ranges) {
      if (ranges.length === 0) return products
      /**
       *  循環多個區間條件，
       * 每種區間類型應該只有一個，
       * 比如價格區間不會有1000-2000和4000-6000同時需要的情況
       */
      for (let range of ranges) {
        // 多個不同類型區間是與邏輯，可以直接賦值給自身
        products = products.filter(item => {
          return item[range.type] >= range.low && item[range.type] <= range.high
        })
      }
      return products
    },
    choosesFilter(products, chooses) {
      let tmpProducts = []
      if (chooses.length === 0) {
        tmpProducts = products
      } else {
        // 選擇類型條件是或邏輯，使用數組連接concat
        for (let choice of chooses) {
          tmpProducts = tmpProducts.concat(
            products.filter(item => {
              return item[choice.type].indexOf(choice.value) !== -1
            })
          )
        }
      }
      return tmpProducts
    }
  },
  handler(productsAll, conditions) {
    return this.doFilter(productsAll, conditions)
  },
  doFilter(products, conditions) {
    // 根據條件循環調用篩選器裏的方法
    for (let key in conditions) {
      // 判斷是否有需要的過濾方法
      if (
        this.ProductFilters.hasOwnProperty(key + "Filter") &&
        typeof this.ProductFilters[key + "Filter"] === "function"
      ) {
        products = this.ProductFilters[key + "Filter"](
          products,
          conditions[key]
        )
      }
    }
    return products
  }
}

import Vue from "vue"

Vue.prototype.$productsFilter = {
  ProductFilters: {
    rangesFilter(products, ranges) {
      if (ranges.length === 0) return products
      for (let range of ranges) {
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
        for (let choice of chooses) {
          tmpProducts = tmpProducts.concat(
            products.filter(item => {
              if (item[choice.type] === undefined) return
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
    for (let key in conditions) {
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

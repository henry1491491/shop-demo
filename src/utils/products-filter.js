import Vue from 'vue'

Vue.prototype.$productsFilter = {
  ProductFilters: {
    rangesFilter (products, ranges) {
      if (ranges.length === 0) return products
      for (const range of ranges) {
        products = products.filter(item => {
          return item[range.type] >= range.low && item[range.type] <= range.high
        })
      }
      return products
    },
    choosesFilter (products, chooses) {
      let tmpProducts = []
      if (chooses.length === 0) {
        tmpProducts = products
      } else {
        for (const choice of chooses) {
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
  handler (productsAll, conditions) {
    return this.doFilter(productsAll, conditions)
  },
  doFilter (products, conditions) {
    for (const key in conditions) {
      if (
        Object.prototype.hasOwnProperty.call(this.ProductFilters, `${key}Filter`) &&
        // this.ProductFilters.hasOwnProperty(key + 'Filter') &&
        typeof this.ProductFilters[key + 'Filter'] === 'function'
      ) {
        products = this.ProductFilters[key + 'Filter'](
          products,
          conditions[key]
        )
      }
    }
    return products
  }
}

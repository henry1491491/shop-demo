<template>
  <div id="views-thecustomer_sidebar">
    <base-sidebar
      v-if="$route.path==='/'"
      :categories="categories"
      :priceRadiosOptions="priceRadiosOptions"
      :priceRadiosSelected="priceRadiosSelected"
      :sortTitle="sortTitle"
      @filter-handler="filterHandler"
      @remove-conditions="removeConditions"
    />

  </div>
</template>

<script>
export default {
  name: "TheCustomerSidebar",
  data() {
    return {
      conditions: {
        chooses: [],
        ranges: []
      },
      priceRadiosOptions: [
        { text: `NT$300 以下`, value: "1", low: 0, high: 300 },
        { text: `NT$300-500`, value: "2", low: 300, high: 500 },
        { text: `NT$500-1000`, value: "3", low: 500, high: 1000 },
        { text: `NT$1000-2000`, value: "4", low: 1000, high: 2000 },
        { text: `NT$2000-2500`, value: "5", low: 2000, high: 2500 },
        { text: `NT$2500-5000`, value: "6", low: 2500, high: 5000 },
        { text: `NT$5000 以上`, value: "7", low: 5000, high: 1000000 }
      ],
      priceRadiosSelected: ""
    }
  },
  computed: {
    categories() {
      return this.$store.state.customer.categories
    },
    filterProducts: {
      get() {
        return this.$store.state.customer.filterProducts
      },
      set(val) {
        this.$store.commit("customer/UPDATE_FILTER_PRODUCTS", val)
      }
    },
    productsAll() {
      return this.$store.state.customer.productsAll
    },
    sortTitle() {
      return this.$store.state.customer.sortTitle
    }
  },
  methods: {
    removeConditions() {
      this.conditions = {}
      this.priceRadiosSelected = ""
      this.$store.commit("customer/SET_SORT_TITLE", "全部")
      this.filteredData(this.productsAll)
    },
    filterHandler(item) {
      if (item.type === "category" && item.value === "全部") {
        this.conditions.chooses = []
        this.$store.commit("customer/SET_SORT_TITLE", item.value)
        this.filteredData(this.productsAll)
      } else if (item.type === "category" && item.value !== "全部") {
        this.conditions.chooses = []
        this.conditions.chooses.push(item)
        this.$store.commit("customer/SET_SORT_TITLE", item.value)
        this.filteredData(this.productsAll)
      } else if (item.type === "price") {
        this.conditions.ranges = []
        this.conditions.ranges.push(item)
        this.filteredData(this.productsAll)
      }
    },
    filteredData(data) {
      this.$store.commit(
        "customer/UPDATE_FILTER_PRODUCTS",
        this.$productsFilter.handler(data, this.conditions)
      )
    }
  }
}
</script>


<template>
  <div id="views-thecustomer_sidebar">
    <div class="mb-2">
      依種類搜尋
    </div>

    <b-list-group>
      <b-list-group-item
        :class="{active:sortTitle === '全部'}"
        button
        class="p-2 "
        @click="filterHandler({type:'category',value:'all'})"
      >
        <span class="ml-2">全部</span>
      </b-list-group-item>

      <b-list-group-item
        v-for="item in categories"
        :key="item"
        :class="{active:sortTitle === item }"
        button
        class="p-2 d-flex justify-content-between align-items-center"
        @click="filterHandler({type:'category',value:item})"
      >
        <span class="ml-2">{{item}}</span>
      </b-list-group-item>
    </b-list-group>

    <hr>

    <div class="mb-2">
      依價格搜尋
    </div>

    <b-list-group>
      <b-list-group-item class="d-flex justify-content-between align-items-center">
        <b-form-group>
          <b-form-radio
            v-for="item in priceRadiosItems"
            :key="item.value"
            v-model="priceRadiosSelected"
            class="m-0 pl-3"
            name="some-radios"
            @change="filterHandler({type:'price',low:item.low,high:item.high})"
          >
            {{item.text}}
          </b-form-radio>
        </b-form-group>
      </b-list-group-item>
    </b-list-group>

    <b-button
      block
      class="text-left pl-0 text-danger d-flex justify-content-start align-items-center"
      variant="link"
      @click="removeConditions"
    >
      <close />
      <span>清除篩選</span>
    </b-button>
  </div>
</template>

<script>
export default {
  name: "TheCustomerSidebar",
  data() {
    return {
      conditions: {
        ranges: [],
        chooses: []
      },
      priceRadiosItems: [
        { text: `NT$300 以下`, value: "1", low: 0, high: 300 },
        { text: `NT$300 - 500`, value: "2", low: 300, high: 500 },
        { text: `NT$500 - 1000`, value: "3", low: 500, high: 1000 },
        { text: `NT$1000 - 2000`, value: "4", low: 1000, high: 2000 },
        { text: `NT$2000 - 2500`, value: "5", low: 2000, high: 2500 },
        { text: `NT$2500 - 5000`, value: "6", low: 2500, high: 5000 },
        { text: `NT$5000 以上`, value: "7", low: 5000, high: 1000000 }
      ],
      priceRadiosSelected: ""
    }
  },
  computed: {
    categories() {
      return Array.from(new Set(this.productsAll.map(el => el.category)))
    },
    filterProducts: {
      get() {
        return this.$store.state.customer.filterProducts
      },
      set(val) {
        this.$store.commit("customer/UPDATE_FILTERPRODUCTS", val)
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
      this.priceRadiosSelected = ""
      this.filterHandler({ type: "price", low: null, high: null })
      this.$store.commit("customer/UPDATE_FILTERPRODUCTS", this.productsAll)
    },
    filterHandler(item) {
      let result
      if (item.type === "category" && item.value !== "all") {
        this.conditions.chooses = []
        this.conditions.chooses.push(item)
        this.$store.commit("customer/SET_SORTTITLE", item.value)
        result = this.$productsFilter.handler(this.productsAll, this.conditions)
        this.$store.commit("customer/UPDATE_FILTERPRODUCTS", result)
      } else if (item.type === "price") {
        this.conditions.ranges = []
        this.conditions.ranges.push(item)
        result = this.$productsFilter.handler(this.productsAll, this.conditions)
        this.$store.commit("customer/UPDATE_FILTERPRODUCTS", result)
      } else {
        this.conditions.chooses = []
        this.$store.commit("customer/SET_SORTTITLE", "全部")
        this.$store.commit("customer/UPDATE_FILTERPRODUCTS", this.productsAll)
      }
    }
  }
}
</script>


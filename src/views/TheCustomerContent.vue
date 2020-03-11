<template>
  <div id="views-thecustomer_content">
    <div
      v-if="$route.path === '/'"
      class="d-flex justify-content-between align-items-center"
    >
      <h4 v-show="sortTitle === '全部'">全部</h4>
      <h4 v-show="sortTitle !== '全部'">
        {{sortTitle}}
      </h4>
      <b-form-select
        v-model="sortSelected"
        :options="sortOptions"
        class="sort-form"
        size="sm"
        @change="sortByPrice(sortSelected)"
      />
    </div>

    <b-row v-if="$route.path === '/'">
      <b-col
        v-for="item in filterProducts"
        :key="item.id"
        class="p-0"
        cols="4"
        sm="3"
        lg="2"
      >
        <base-card-products
          :favorList="favorList"
          :item="item"
          :status="status"
          @add-to-cart="addToCart"
          @get-product="getProduct"
          @go-to-shopping-cart="goToShoppingCart"
          @set-favor-title="setFavorItem"
        />
      </b-col>
    </b-row>

    <b-row v-else-if="$route.path === '/favor'">
      <b-col
        v-for="item in favorProducts"
        :key="item.id"
        class="p-0"
        cols="4"
        sm="3"
        lg="2"
      >
        <base-card-products
          :favorList="favorList"
          :item="item"
          :status="status"
          @add-to-cart="addToCart"
          @get-product="getProduct"
          @go-to-shopping-cart="goToShoppingCart"
          @set-favor-title="setFavorItem"
        />
      </b-col>
    </b-row>

    <div v-show="!filterProducts.length && $route.path === '/'">
      <base-card-empty cardText="目前還沒有符合的商品喔!" />
    </div>

    <div v-show="!favorProducts.length && $route.path === '/favor'">
      <base-card-empty cardText="心願清單沒有東西喔！" />
    </div>
    <!-- modal -->
    <b-modal
      ref="show-product-modal"
      :title="product.title"
      size="md"
    >
      <b-card
        :img-src="product.imageUrl"
        :img-alt="product.title"
        :title="product.title"
        img-height="300px"
        img-top
        class="card-img-top-modal"
      >
        <b-card-text>
          {{product.description}}
        </b-card-text>
        <b-card-text>
          <del>原價{{product.origin_price}}元</del>
        </b-card-text>
        <b-card-text>
          現在只要{{product.price}}元
        </b-card-text>

        <b-form-select
          v-model="product.num"
          :options="cartAmountOptions"
          class="mb-3"
        />
      </b-card>
      <template v-slot:modal-footer>
        <div class="w-100">
          <div
            v-show="product.num"
            class="float-left"
          >
            小記{{product.price * product.num}}元
          </div>
          <b-button
            class="float-right"
            size="sm"
            variant="danger"
            @click="addToCart(product.id,product.num)"
          >
            <b-spinner
              v-if="status.loadingItem === product.id"
              class="mr-1"
              label="Spinning"
              small
              variant="secondary"
            />
            加到購物車
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>


<script>
import { apiCustomerGetProduct } from "../plugins/axios"

export default {
  name: "TheCustomerContent",
  data() {
    return {
      cartAmountOptions: [
        { text: "請選擇數量", value: null },
        { text: "選購 1 件", value: 1 },
        { text: "選購 2 件", value: 2 },
        { text: "選購 3 件", value: 3 },
        { text: "選購 4 件", value: 4 },
        { text: "選購 5 件", value: 5 },
        { text: "選購 6 件", value: 6 },
        { text: "選購 7 件", value: 7 },
        { text: "選購 8 件", value: 8 },
        { text: "選購 9 件", value: 9 },
        { text: "選購 10 件", value: 10 }
      ],
      favorList: [],
      product: {},
      sortSelected: null,
      sortOptions: [
        { value: null, text: "價格" },
        { value: "hign", text: "價格由高至低" },
        { value: "low", text: "價格由低至高" }
      ]
    }
  },
  computed: {
    favorProducts() {
      const isArray = (fList, pAry) => {
        let result = []
        for (let i = 0; i < fList.length; i++) {
          let item = pAry.filter(el => el.title === fList[i])
          result = result.concat(item)
        }
        return result
      }
      return isArray(this.favorList, this.productsAll)
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
    },
    status: {
      get() {
        return this.$store.state.customer.status
      },
      set(val) {
        this.$store.commit("customer/SET_STATUS_LOADINGITEM", val)
      }
    }
  },
  mounted() {
    this.getFavorTitleList()
  },
  methods: {
    addToCart(id, qty = 1) {
      this.$store.dispatch("customer/addToCart", { id, qty: 1 })
      this.$refs["show-product-modal"].hide()
    },
    getFavorTitleList() {
      this.favorList = JSON.parse(localStorage.getItem("favorItem")) || []
    },
    async getProduct(id) {
      //this.$store.commit("customer/SET_STATUS_LOADINGITEM", id)
      let response = await apiCustomerGetProduct(id)
      if (!response.data.success) return
      response.data.product.num = null
      this.product = response.data.product
      this.$refs["show-product-modal"].show()
      //this.$store.commit("customer/SET_STATUS_LOADINGITEM", "")
    },
    goToShoppingCart() {
      this.$router.push("/customer_carts")
    },
    setFavorItem(item) {
      const setTitleToStorage = () => {
        localStorage.setItem("favorItem", JSON.stringify(this.favorList))
        this.getFavorTitleList()
      }
      const isFavored = el => el === item.title
      if (
        this.favorList.length === 0 ||
        this.favorList.some(isFavored) === false
      ) {
        this.favorList.push(item.title)
        setTitleToStorage()
      } else {
        let favorIndex = this.favorList.findIndex(isFavored)
        this.favorList.splice(favorIndex, 1)
        setTitleToStorage()
      }
    },
    sortByPrice(item) {
      if (item === "hign") {
        this.$store.commit("customer/SET_FILTER_PRODUCTS_BY_SORT", "hign")
      } else if (item === "low") {
        this.$store.commit("customer/SET_FILTER_PRODUCTS_BY_SORT", "low")
      }
    }
    /*
    getProducts(page = 1) {
      const api = `/products?page=${page}`
      this.axios.get(api).then(response => {
        this.products = response.data.products
        this.pagination = response.data.pagination
      })
    },
    */
  }
}
</script>


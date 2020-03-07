<template>
  <div id="views-thecustomer_content">
    <div class="d-flex justify-content-between align-items-center">
      <h4 v-show="sortTitle === 'all'">全部</h4>
      <h4 v-show="sortTitle !== 'all'">
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

    <b-form-row>
      <b-col
        v-for="item in filterProducts"
        :key="item.id"
        cols="12"
        xs="6"
        sm="6"
        md="6"
        lg="3"
      >
        <base-card-products
          :item="item"
          :favorArray="favorArray"
          :status="status"
          @add-to-favorite-list="addToFavoriteList"
          @get-product="getProduct"
          @add-to-cart="addToCart"
          @go-to-shopping-cart="goToShoppingCart"
        />
      </b-col>
    </b-form-row>

    <div v-show="!filterProducts.length">
      <base-card-empty cardText="目前還沒有符合的商品喔!" />
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
        img-top
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
      product: {},
      products: [],
      sortSelected: null,
      sortOptions: [
        { value: null, text: "價格" },
        { value: "hign", text: "價格由高至低" },
        { value: "low", text: "價格由低至高" }
      ]
    }
  },
  computed: {
    favorArray: {
      get() {
        return this.$store.state.customer.favorArray
      },
      set(val) {
        this.$store.commit("customer/SET_TO_FAVORLIST", val)
      }
    },
    status: {
      get() {
        return this.$store.state.customer.status
      },
      set(val) {
        this.$store.commit("customer/SET_STATUS_LOADINGITEM", val)
      }
    },
    productsAll() {
      return this.$store.state.customer.productsAll
    },
    filterProducts: {
      get() {
        return this.$store.state.customer.filterProducts
      },
      set(val) {
        this.$store.commit("customer/UPDATE_FILTERPRODUCTS", val)
      }
    },
    sortTitle() {
      return this.$store.state.customer.sortTitle
    }
  },
  mounted() {
    this.$store.commit("customer/GET_FAVORLIST")
  },
  methods: {
    /*
    getProducts(page = 1) {
      const api = `/products?page=${page}`
      this.axios.get(api).then(response => {
        this.products = response.data.products
        this.pagination = response.data.pagination
      })
    },
    */
    sortByPrice(item) {
      if (item === "hign") {
        this.$store.commit("customer/SET_FILTERPRODUCTS_BY_SORT", "hign")
      } else if (item === "low") {
        this.$store.commit("customer/SET_FILTERPRODUCTS_BY_SORT", "low")
      }
    },
    addToFavoriteList(item) {
      this.$store.commit("customer/SET_TO_FAVORLIST", item)
    },
    getProduct(id) {
      this.$store.commit("customer/SET_STATUS_LOADINGITEM", id)
      apiCustomerGetProduct(id).then(response => {
        response.data.product.num = null
        this.product = response.data.product
        this.$refs["show-product-modal"].show()
        this.$store.commit("customer/SET_STATUS_LOADINGITEM", "")
      })
    },
    addToCart(id, qty = 1) {
      this.$store.dispatch("customer/addToCart", { id, qty: 1 })
      this.$refs["show-product-modal"].hide()
    },
    goToShoppingCart() {
      this.$router.push("/customer/customer_carts")
    }
  }
}
</script>


<template>
  <div id="views-thecustomer_content">
    <b-row>
      <b-col md="2">
        <base-sidebar
          :categories="categories"
          :price-radios-options="priceRadiosOptions"
          :price-radios-selected="priceRadiosSelected"
          :sort-title="sortTitle"
          @filter-handler="filterHandler"
          @remove-conditions="removeConditions"
        />
      </b-col>
      <b-col
        v-if="!isLoading"
        md="10"
      >
        <div class="d-flex justify-content-between align-items-center">
          <h4 v-show="sortTitle === '全部'">
            全部
          </h4>
          <h4 v-show="sortTitle !== '全部'">
            {{ sortTitle }}
          </h4>
          <b-form-select
            v-model="sortSelected"
            :options="sortOptions"
            class="sort-form"
            size="sm"
            @change="sortByPrice(sortSelected)"
          />
        </div>

        <b-row v-if="isLoading">
          <b-col
            v-for="i in 18"
            :key="i"
            cols="4"
            sm="3"
            lg="2"
          >
            <v-skeleton-loader type="card" />
          </b-col>
        </b-row>

        <b-row v-if="!isLoading">
          <b-col
            v-for="item in filterPageProducts"
            :key="item.id"
            class="p-0"
            cols="4"
            sm="3"
            lg="2"
          >
            <base-card-products
              :favor-list="favorList"
              :item="item"
              :status="status"
              class="base-card"
              @add-to-cart="addToCart"
              @get-product="getProduct"
              @go-to-product-detail="goToProductDetail"
              @go-to-shopping-cart="goToShoppingCart"
              @set-favor-title="setFavorItem"
            />
          </b-col>
        </b-row>

        <div v-if="!filterProducts.length">
          <base-card-empty card-text="目前還沒有符合的商品喔!" />
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
            class="card-img-top-modal"
            img-height="300px"
            img-top
          >
            <b-card-text>
              {{ product.description }}
            </b-card-text>
            <b-card-text>
              <del>原價{{ product.origin_price }}元</del>
            </b-card-text>
            <b-card-text>
              現在只要{{ product.price }}元
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
                小記{{ product.price * product.num }}元
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
              <b-button
                class="float-right mr-2"
                size="sm"
                variant="outline-secondary"
                @click="goToProductDetail(product.id)"
              >
                查看更多
              </b-button>
            </div>
          </template>
        </b-modal>
      </b-col>
      <b-col md="12">
        <base-pagination-products
          :current-page="currentPage"
          :per-page="perPage"
          :rows="rows"
          class="float-right"
          @get-current-page="getCurrentPage"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { apiCustomerGetProduct } from '../plugins/axios'

export default {
  name: 'TheCustomerContent',
  data () {
    return {
      cartAmountOptions: [
        { text: '請選擇數量', value: null },
        { text: '選購 1 件', value: 1 },
        { text: '選購 2 件', value: 2 },
        { text: '選購 3 件', value: 3 },
        { text: '選購 4 件', value: 4 },
        { text: '選購 5 件', value: 5 },
        { text: '選購 6 件', value: 6 },
        { text: '選購 7 件', value: 7 },
        { text: '選購 8 件', value: 8 },
        { text: '選購 9 件', value: 9 },
        { text: '選購 10 件', value: 10 }
      ],
      conditions: {
        chooses: [],
        ranges: []
      },
      currentPage: 1,
      favorList: [],
      perPage: 18,
      priceRadiosOptions: [
        { text: 'NT$300 以下', value: '1', low: 0, high: 300 },
        { text: 'NT$300-500', value: '2', low: 300, high: 500 },
        { text: 'NT$500-1000', value: '3', low: 500, high: 1000 },
        { text: 'NT$1000-2000', value: '4', low: 1000, high: 2000 },
        { text: 'NT$2000-2500', value: '5', low: 2000, high: 2500 },
        { text: 'NT$2500-5000', value: '6', low: 2500, high: 5000 },
        { text: 'NT$5000 以上', value: '7', low: 5000, high: 1000000 }
      ],
      priceRadiosSelected: '',
      product: {},
      showEmptyCardProducts: false,
      showEmptyCardFavor: false,
      sortSelected: null,
      sortOptions: [
        { value: null, text: '價格' },
        { value: 'hign', text: '價格由高至低' },
        { value: 'low', text: '價格由低至高' }
      ]
    }
  },
  computed: {
    categories () {
      return this.$store.state.customer.categories
    },
    filterProducts: {
      get () {
        return this.$store.state.customer.filterProducts
      },
      set (val) {
        this.$store.commit('customer/UPDATE_FILTER_PRODUCTS', val)
      }
    },
    filterPageProducts () {
      const start = (this.currentPage - 1) * this.perPage
      const total =
        this.currentPage * this.perPage > this.filterProducts
          ? this.filterProducts
          : this.currentPage * this.perPage
      return this.$store.state.customer.filterProducts.slice(start, total)
    },
    isLoading () {
      return this.$store.getters.isLoading
    },
    productsAll () {
      return this.$store.state.customer.productsAll
    },
    rows () {
      return this.filterProducts.length
    },
    sortTitle () {
      return this.$store.state.customer.sortTitle
    },
    status: {
      get () {
        return this.$store.state.customer.status
      },
      set (val) {
        this.$store.commit('customer/SET_STATUS_LOADINGITEM', val)
      }
    }
  },
  mounted () {
    this.getFavorTitleList()
  },
  methods: {
    async addToCart (id, qty = 1) {
      try {
        const result = await this.$store.dispatch('customer/addToCart', {
          id,
          qty: 1
        })
        if (!result.msg) return
        this.$refs['show-product-modal'].hide()
        this.$store.dispatch('alert/setMsgsAlert', result)
      } catch (e) { console.log(e) }
    },
    filterHandler (item) {
      if (item.type === 'category' && item.value === '全部') {
        this.conditions.chooses = []
        this.$store.commit('customer/SET_SORT_TITLE', item.value)
        this.filteredData(this.productsAll)
      } else if (item.type === 'category' && item.value !== '全部') {
        this.conditions.chooses = []
        this.conditions.chooses.push(item)
        this.$store.commit('customer/SET_SORT_TITLE', item.value)
        this.filteredData(this.productsAll)
      } else if (item.type === 'price') {
        this.conditions.ranges = []
        this.conditions.ranges.push(item)
        this.filteredData(this.productsAll)
      }
    },
    filteredData (data) {
      this.$store.commit(
        'customer/UPDATE_FILTER_PRODUCTS',
        this.$productsFilter.handler(data, this.conditions)
      )
    },
    getCurrentPage (page = 1) {
      this.currentPage = page
    },
    getFavorTitleList () {
      this.favorList = JSON.parse(localStorage.getItem('favorItem')) || []
    },
    async getProduct (id) {
      try {
        const response = await apiCustomerGetProduct(id)
        if (!response.data.success) return
        response.data.product.num = null
        this.product = response.data.product
        this.$refs['show-product-modal'].show()
      } catch (e) {
        console.log(e)
      }
    },
    goToProductDetail (id) {
      this.$router.push({ path: `/detail/${id}` }).catch(err => {
        console.log(err)
      })
    },
    goToShoppingCart () {
      this.$router.push('/customer_carts')
    },
    removeConditions () {
      this.conditions = {}
      this.priceRadiosSelected = ''
      this.$store.commit('customer/SET_SORT_TITLE', '全部')
      this.filteredData(this.productsAll)
      this.$store.dispatch('alert/setMsgsAlert', this._$alert('已清除篩選'))
    },
    setFavorItem (item) {
      const setTitleToStorage = () => {
        localStorage.setItem('favorItem', JSON.stringify(this.favorList))
        this.getFavorTitleList()
      }
      const isFavored = el => el === item.title
      if (
        this.favorList.length === 0 ||
        this.favorList.some(isFavored) === false
      ) {
        this.favorList.push(item.title)
        setTitleToStorage()
        this.$store.dispatch('alert/setMsgsAlert', this._$alert('已加入'))
      } else {
        const favorIndex = this.favorList.findIndex(isFavored)
        this.favorList.splice(favorIndex, 1)
        setTitleToStorage()
        this.$store.dispatch('alert/setMsgsAlert', this._$alert('已移除', 'warning'))
      }
    },
    sortByPrice (item) {
      if (item === 'hign') {
        this.$store.commit('customer/SET_FILTER_PRODUCTS_BY_SORT', 'hign')
      } else if (item === 'low') {
        this.$store.commit('customer/SET_FILTER_PRODUCTS_BY_SORT', 'low')
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

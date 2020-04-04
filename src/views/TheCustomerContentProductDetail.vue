<template>
  <div
    v-if="product.title"
    id="views-thecustomer_contentproductdetail"
  >
    <v-skeleton-loader
      v-if="isLoading"
      class="my-4"
      type="heading"
    />

    <b-breadcrumb
      v-if="!isLoading"
      class="mt-3"
    >
      <b-breadcrumb-item href="/">
        首頁
      </b-breadcrumb-item>
      <b-breadcrumb-item :href="`/detail/${$route.params.productId}`">
        {{ product.title }}
      </b-breadcrumb-item>
    </b-breadcrumb>

    <v-skeleton-loader
      v-if="isLoading"
      type="card"
    />

    <b-card
      v-if="!isLoading"
      :img-src="
        product.imageUrl"
      :img-alt="product.title"
      class="img-left-card my-3"
      img-height="350px"
      img-left
    >
      <b-card-title>
        <span class="h2 text-secondary">{{ product.title }}</span>
      </b-card-title>

      <b-card-text class="d-flex justify-content-start align-items-end">
        <span class="h3 mr-3 text-primary">NT {{ product.price | currency }}</span>
        <del
          v-show="product.price !== product.origin_price"
          class="h5 text-secondary"
        >NT {{ product.origin_price | currency }}</del>
      </b-card-text>

      <div v-show="product.origin_price !== product.price">
        <b-button
          class="coupon-button-left mb-4 py-0"
          disabled
          size="sm"
          variant="danger"
        >
          {{ discounted }}折
        </b-button>
        <b-button
          class="coupon-button-right mb-4 py-0"
          disabled
          size="sm"
          variant="outline-danger"
        >
          便宜了 {{ product.origin_price - product.price }} 元
        </b-button>
      </div>

      <b-form-select
        v-model="product.num"
        :options="cartAmountOptions"
        class="mb-3"
      />

      <b-card-text
        v-show="product.price * product.num !== 0"
        class="h5 float-right my-3 text-secondary"
      >
        小記 NT {{ product.price * product.num | currency }}元
      </b-card-text>

      <b-button
        block
        d-flex
        size="sm"
        variant="danger"
        @click="addToCart(product.id,product.num)"
      >
        <cart-outline-icon class="mr-1" />
        <span>加入購物車</span>
      </b-button>
      <b-button
        block
        size="sm"
        variant="outline-secondary"
        @click="setFavorItem(product.title)"
      >
        <heart-outline
          v-if="favorList.indexOf(product.title) === -1"
          class="mr-1"
        />
        <heart
          v-else
          class="mr-1"
        />
        <span>收藏商品</span>
      </b-button>
    </b-card>

    <v-skeleton-loader
      v-if="isLoading"
      type="list-item-two-line"
    />

    <b-card
      v-if="!isLoading"
      no-body
    >
      <b-tabs card>
        <b-tab
          title="商品描述"
          active
        >
          <b-card-text>
            {{ product.description }}
          </b-card-text>
          <b-card-text>
            <small class="text-danger">更多介紹請看商品內容</small>
          </b-card-text>
        </b-tab>
        <b-tab title="商品內容">
          <b-card-title class="text-primary">
            品種介紹
          </b-card-title>
          <b-card-text>
            {{ product.content }}
          </b-card-text>
          <b-card-title class="text-primary">
            適合介質、土壤
          </b-card-title>
          <b-card-text>
            {{ product.content }}
          </b-card-text>
          <b-card-title class="text-primary">
            喜好溫度、濕度及光照
          </b-card-title>
          <b-card-text>
            {{ product.content }}
          </b-card-text>
          <b-card-title class="text-primary">
            售後服務
          </b-card-title>
          <b-card-text>
            {{ product.content }}
          </b-card-text>
          <b-card-title class="text-primary">
            我們的三大保證
          </b-card-title>
          <b-card-text>
            <b-list-group>
              <b-list-group-item class="px-0 py-1">
                <span class="text-danger"><b>保證</b>絕不販售保育物種</span>
              </b-list-group-item>
              <b-list-group-item class="px-0  py-1">
                <span class="text-danger"><b>保證</b>商品瑕疵七天內退貨</span>
              </b-list-group-item>
              <b-list-group-item class="px-0  py-1">
                <span class="text-danger"><b>保證</b>商品與圖片一模一樣</span>
              </b-list-group-item>
            </b-list-group>
          </b-card-text>

          <b-img
            :src="product.imageUrl"
            fluid
          />
        </b-tab>
      </b-tabs>
    </b-card>

    <hr>

    <b-card
      v-if="filterDetailProducts.length"
      bg-variant="light"
      header="同類別的其他商品"
      class="text-left"
    >
      <b-row no-gutters>
        <b-col
          v-for="item in filterDetailProducts"
          :key="item.id"
          cols="4"
          sm="3"
          lg="2"
        >
          <base-card-products
            :favor-list="favorList"
            :item="item"
            :status="status"
            @add-to-cart="addToCart"
            @get-product="getProductDetail"
            @go-to-shopping-cart="goToShoppingCart"
            @go-to-product-detail="goToProductDetail"
            @set-favor-title="setFavorItem"
          />
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import { apiCustomerGetProduct } from '../plugins/axios'
export default {
  name: 'TheCustomerContentProductDetail',
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
      favorList: [],
      product: {}
    }
  },
  computed: {
    discounted () {
      return ((this.product.price / this.product.origin_price) * 10).toFixed(1)
    },
    filterDetailProducts () {
      return this.productsAll.filter(el => {
        return (
          el.category === this.product.category &&
          el.title !== this.product.title
        )
      })
    },
    isLoading () {
      return this.$store.getters.isLoading
    },
    productsAll () {
      return this.$store.state.customer.productsAll
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
    this.getProduct(this.$route.params.productId)
    this.getFavorTitleList()
  },
  methods: {
    async addToCart (id, qty = 1) {
      const result = await this.$store.dispatch('customer/addToCart', {
        id,
        qty: 1
      })
      if (!result.msg) return
      this.$store.dispatch('alert/setMsgsAlert', result)
    },
    async getProduct (id) {
      const response = await apiCustomerGetProduct(id)
      if (!response.data.success) return
      response.data.product.num = null
      this.product = response.data.product
    },
    getFavorTitleList () {
      this.favorList = JSON.parse(localStorage.getItem('favorItem')) || []
    },
    async getProductDetail (id) {
      this.$router.push({ path: `/detail/${id}` })
      this.getProduct(id)
    },
    goToProductDetail (id) {
      this.$router.push({ path: `/detail/${id}` })
    },
    goToShoppingCart () {
      this.$router.push('/customer_carts')
    },
    setFavorItem (title) {
      if (typeof title === 'object') {
        title.toString()
        title = title.title
      }
      const setTitleToStorage = () => {
        localStorage.setItem('favorItem', JSON.stringify(this.favorList))
        this.getFavorTitleList()
      }
      const isFavored = el => el === title
      if (
        this.favorList.length === 0 ||
        this.favorList.some(isFavored) === false
      ) {
        this.favorList.push(title)
        this.$store.dispatch('alert/setMsgsAlert', {
          msg: '已加入',
          variant: 'primary',
          id: Math.floor(new Date() / 1000)
        })
        setTitleToStorage()
      } else {
        const favorIndex = this.favorList.findIndex(isFavored)
        this.favorList.splice(favorIndex, 1)
        this.$store.dispatch('alert/setMsgsAlert', {
          msg: '已移除',
          variant: 'warning',
          id: Math.floor(new Date() / 1000)
        })
        setTitleToStorage()
      }
    }
  }
}
</script>

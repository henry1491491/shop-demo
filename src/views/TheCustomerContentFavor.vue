<template>
  <div id="views-thecustomer_contentfavor">
    <!--
    <b-row>
      <b-col md="1" />
      <b-col>
        <b-row>
          <b-col
            v-for="i in 24"
            :key="i"
            cols="4"
            sm="3"
            lg="2"
          >
            <v-skeleton-loader type="card" />
          </b-col>
        </b-row>
      </b-col>
      <b-col md="1" />
    </b-row>
    -->
    <b-row>
      <b-col md="1" />
      <b-col>
        <b-row>
          <b-col
            v-for="item in favorProducts"
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
      </b-col>
      <b-col md="1" />
    </b-row>

    <div
      v-if="!favorProducts.length"
      class="d-flex flex-column"
    >
      <base-card-empty
        card-text="心願清單沒有東西喔！"
        class="mb-3"
      >
        <template slot="action">
          <b-button>
            到首頁逛逛
          </b-button>
        </template>
      </base-card-empty>
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
  </div>
</template>

<script>
import { apiCustomerGetProduct } from '../plugins/axios'

export default {
  name: 'TheCustomerContentFavor',
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
  mounted () {
    this.getFavorTitleList()
  },
  computed: {
    favorProducts () {
      const isArray = (fList, pAry) => {
        let result = []
        for (let i = 0; i < fList.length; i++) {
          const item = pAry.filter(el => el.title === fList[i])
          result = result.concat(item)
        }
        return result
      }
      return isArray(this.favorList, this.productsAll)
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
      } catch (e) {
        console.log(e)
      }
    },
    async getFavorTitleList () {
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
        this.$store.dispatch('alert/setMsgsAlert', this._$alert('已加入願望清單'))
      } else {
        const favorIndex = this.favorList.findIndex(isFavored)
        this.favorList.splice(favorIndex, 1)
        setTitleToStorage()
        this.$store.dispatch('alert/setMsgsAlert', this._$alert('已從願望清單移除', 'warning'))
      }
    }
  }
}
</script>

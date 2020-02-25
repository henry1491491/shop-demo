<template>
  <b-container class="views-the_customerorder">
    <!-- navbar -->
    <b-row>
      <b-navbar
        toggleable="lg"
        type="light"
        variant="fade"
      >
        <b-navbar-brand href="#">
          Orchids 蘭園
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse
          id="nav-collapse"
          is-nav
        >
          <!-- Right aligned nav items -->
          <b-navbar-nav>
            <b-nav-form>
              <b-form-input
                size="sm"
                class="mr-sm-2"
                placeholder="搜尋"
              ></b-form-input>
              <b-button
                size="sm"
                class="my-2 my-sm-0"
                type="submit"
              >
                搜尋
              </b-button>
            </b-nav-form>
          </b-navbar-nav>

          <b-navbar-nav class="ml-auto">
            <b-nav-item>
              <b-button size="sm">登出</b-button>
            </b-nav-item>
            <b-nav-item href="#">
              <cart-outline-icon />
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </b-row>

    <hr>
    <!-- x-tabs-->

    <b-nav
      small
      align="center"
    >
      <b-nav-item active>二月優惠</b-nav-item>
      <b-nav-item>限時搶購</b-nav-item>
      <b-nav-item>指定商品滿 1000 八折活動</b-nav-item>
      <b-nav-item disabled>春季限定</b-nav-item>
    </b-nav>

    <b-row>
      <!-- sidebar y-tabs-->
      <b-col
        cols="12"
        sm="12"
        md="2"
      >
        <b-list-group>
          <b-list-group-item class="d-flex justify-content-between align-items-center">
            中國蘭
            <b-badge
              variant="primary"
              pill
            >14</b-badge>
          </b-list-group-item>

          <b-list-group-item class="d-flex justify-content-between align-items-center">
            西洋蘭
            <b-badge
              variant="primary"
              pill
            >2</b-badge>
          </b-list-group-item>

          <b-list-group-item class="d-flex justify-content-between align-items-center">
            技術書籍
            <b-badge
              variant="primary"
              pill
            >1</b-badge>
          </b-list-group-item>

          <b-list-group-item class="d-flex justify-content-between align-items-center">
            種花相關器具
            <b-badge
              variant="primary"
              pill
            >1</b-badge>
          </b-list-group-item>

          <b-list-group-item class="d-flex justify-content-between align-items-center">
            肥料與藥劑
            <b-badge
              variant="primary"
              pill
            >1</b-badge>
          </b-list-group-item>

          <b-list-group-item class="d-flex justify-content-between align-items-center">
            會員專區
            <b-badge
              variant="primary"
              pill
            >1</b-badge>
          </b-list-group-item>
        </b-list-group>
        <hr>

        <b-list-group>
          <b-list-group-item class="d-flex justify-content-between align-items-center">
            <b-form-group label="依價格搜尋">
              <b-form-radio
                v-for="item in priceRadiosItems"
                :key="item.value"
                v-model="selected"
                name="some-radios"
                :value="item.value"
              >
                {{item.text}}
              </b-form-radio>
            </b-form-group>
          </b-list-group-item>

          <b-list-group-item>
            <b-button
              squared
              size="sm"
              block
              variant="outline-primary"
            >
              清除篩選
            </b-button>
          </b-list-group-item>
        </b-list-group>
      </b-col>
      <!-- products card -->
      <b-col
        cols="12"
        sm="12"
        md="10"
      >
        <b-form-row>
          <b-col
            cols="12"
            xs="6"
            sm="6"
            md="6"
            lg="3"
            v-for="(item,key) in products"
            :key="key"
          >
            <b-card
              :img-src="item.imageUrl"
              :img-alt="item.title"
              no-body
              img-top
              tag="article"
              class="b-card-custom m-1 pt-0"
            >
              <b-card-body class="p-1">

                <b-button
                  variant="link"
                  class="c-card-text-title font-weight-bold m-1 p-0"
                  @click.stop="getProduct(item.id)"
                >
                  {{item.title}}
                </b-button>

                <b-card-text class="c-card-text-description m-1">
                  {{item.description}}
                </b-card-text>

                <div class="d-flex align-items-center justify-content-between">
                  <div class="c-card-text-title m-1">NT {{ item.price | currency }}</div>
                  <del class="c-card-text-description text-muted m-1">NT {{ item.origin_price | currency }}</del>
                </div>
              </b-card-body>

              <div class="d-flex justify-between m-2">
                <b-button
                  squared
                  size="sm"
                  variant="link"
                >
                  <b-spinner
                    v-if="status.loadingItem === item.id"
                    variant="secondary"
                    label="Spinning"
                    small
                  />
                  <cart-outline-icon
                    v-if="status.loadingItem !== item.id"
                    @click.stop="addToCart(item.id)"
                  />
                </b-button>

                <b-button
                  class="ml-auto"
                  squared
                  size="sm"
                  variant="danger"
                >
                  直接購買
                </b-button>
              </div>

            </b-card>
          </b-col>
        </b-form-row>

        <!-- modal -->
        <b-modal
          ref="show-product-modal"
          size="md"
          :title="product.title"
        >

          <b-card
            :img-src="product.imageUrl"
            :img-alt="product.title"
            img-top
            :title="product.title"
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
            ></b-form-select>
          </b-card>
          <template v-slot:modal-footer>
            <div class="w-100">
              <div class="float-left">
                小記{{product.price * product.num}}元
              </div>
              <b-button
                variant="danger"
                size="sm"
                class="float-right"
                @click="addToCart(product.id,product.num)"
              >
                <b-spinner
                  v-if="status.loadingItem === product.id"
                  variant="secondary"
                  label="Spinning"
                  small
                  class="mr-1"
                />
                加到購物車
              </b-button>
            </div>
          </template>
        </b-modal>

        <b-pagination-default
          :pagination="pagination"
          justify="justify-content-end"
          v-on:paginate="getProducts"
        />
      </b-col>
    </b-row>
    <hr>

    <h1>購物車內容</h1>

    <b-table
      :items="carts"
      :fields="cardfields"
      responsive
      small
      striped
      stacked="md"
    >
      <template v-slot:cell(title)="data">
        <p class="m-0">{{data.item.product.title}}</p>
        <p
          v-if="data.item.coupon"
          class="m-0 text-success"
        >
          已套用優惠券
        </p>
      </template>

      <template v-slot:cell(qty)="data">
        {{data.item.qty}} / {{data.item.product.unit}}
      </template>

      <template v-slot:cell(price)="data">
        {{data.item.total | currency}}
      </template>

      <template v-slot:cell(action)="row">
        <b-button
          size="sm"
          class="mr-1"
          variant="outline-danger"
          @click="removeCart(row.item.id)"
        >
          <trash-can-outline />
        </b-button>
      </template>
    </b-table>

    <b-card>
      <b-card-text class="text-right">
        總計：{{cartsTotal.total}}
      </b-card-text>

      <b-card-text
        v-show="cartsTotal.final_total !== cartsTotal.total"
        class="text-right text-success"
      >
        折扣價：{{cartsTotal.final_total}}
      </b-card-text>

      <b-input-group>
        <b-form-input
          v-model="coupon_code"
          type="text"
          placeholder="請輸入優惠碼"
        ></b-form-input>

        <b-input-group-append>
          <b-button
            variant="outline-secondary"
            @click="addCouponCode"
          >
            套用優惠碼
          </b-button>
        </b-input-group-append>
      </b-input-group>
    </b-card>

    <hr>

    <h1>填寫基本資料</h1>

    <b-card>
      <validation-observer
        ref="observer"
        v-slot="{ passes }"
      >
        <b-form
          @submit.prevent="passes(createOrder)"
          v-if="show"
        >
          <validation-provider
            name="信箱"
            rules="required|email"
            v-slot="validationContext"
          >
            <b-form-group
              id="input-email"
              label="信箱"
              label-for="input-email"
            >
              <b-form-input
                v-model="form.user.email"
                :state="getValidationState(validationContext)"
                id="input-email"
                required
                placeholder="請輸入信箱"
              >
              </b-form-input>
              <b-form-invalid-feedback id="input-1-live-feedback">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <validation-provider
            name="姓名"
            rules="required"
            v-slot="validationContext"
          >
            <b-form-group
              id="input-name"
              label="收件人姓名"
              label-for="input-name"
            >
              <b-form-input
                v-model="form.user.name"
                :state="getValidationState(validationContext)"
                id="input-name"
                required
                placeholder="請輸入姓名"
              ></b-form-input>
              <b-form-invalid-feedback id="input-1-live-feedback">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <validation-provider
            name="電話"
            rules="required"
            v-slot="validationContext"
          >
            <b-form-group
              id="input-tel"
              label="收件人電話"
              label-for="input-tel"
            >
              <b-form-input
                v-model="form.user.phone"
                :state="getValidationState(validationContext)"
                id="input-tel"
                required
                placeholder="請輸入電話"
              ></b-form-input>
              <b-form-invalid-feedback id="input-1-live-feedback">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <validation-provider
            name="地址"
            rules="required"
            v-slot="validationContext"
          >
            <b-form-group
              id="input-address"
              label="收件人地址"
              label-for="input-address"
            >
              <b-form-input
                v-model="form.user.address"
                :state="getValidationState(validationContext)"
                id="input-address"
                required
                placeholder="請輸入地址"
              ></b-form-input>
              <b-form-invalid-feedback id="input-1-live-feedback">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <validation-provider
            name="留言"
            rules="max:300"
            v-slot="validationContext"
          >
            <b-form-group
              id="input-msgs"
              label="留言"
              label-for="input-msg"
            >
              <b-form-textarea
                v-model="form.message"
                :state="getValidationState(validationContext)"
                id="input-msgs"
                placeholder="說點什麼⋯⋯"
                rows="3"
                max-rows="6"
              ></b-form-textarea>
              <b-form-invalid-feedback id="input-1-live-feedback">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <b-button
            type="submit"
            variant="primary"
            size="sm"
            @click="createOrder"
          >
            提交
          </b-button>
        </b-form>
      </validation-observer>
    </b-card>

  </b-container>
</template>

<script>
export default {
  name: "TheCustomerOrder",
  data() {
    return {
      priceRadiosItems: [
        { text: `NT$300 以下`, value: "1" },
        { text: `NT$300 - 500`, value: "2" },
        { text: `NT$500 - 1000`, value: "3" },
        { text: `NT$1000 - 2000`, value: "4" },
        { text: `NT$2000 - 2500`, value: "5" },
        { text: `NT$2500 - 5000`, value: "6" },
        { text: `NT$5000 以上`, value: "7" }
      ],
      selected: "",
      products: [],
      product: {},
      isLoading: false,
      status: {
        loadingItem: ""
      },
      cartAmountSelected: null,
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
      pagination: {},
      carts: [],
      cartsTotal: {},
      cardfields: [
        { key: "action", label: "" },
        { key: "title", label: "品名" },
        { key: "qty", label: "數量" },
        { key: "price", label: "單價" }
      ],
      coupon_code: "",
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: ""
        },
        message: ""
      },
      show: true
    }
  },
  mounted() {
    this.getProducts()
    this.getCart()
  },
  methods: {
    getProducts(page = 1) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`
      this.loading = true
      this.axios.get(api).then(response => {
        this.loading = false
        this.products = response.data.products
        this.pagination = response.data.pagination
      })
    },
    getProduct(id) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`
      this.status.loadingItem = id
      this.axios.get(api).then(response => {
        this.product = response.data.product
        this.$refs["show-product-modal"].show()
        //this.pagination = response.data.pagination
        this.status.loadingItem = ""
      })
    },
    addToCart(id, qty = 1) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      this.status.loadingItem = id
      const cart = {
        product_id: id,
        qty
      }
      this.axios.post(api, { data: cart }).then(response => {
        //console.log(response.data)
        this.status.loadingItem = ""
        this.getCart()
        this.$refs["show-product-modal"].hide()
      })
    },
    getCart() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      this.isloading = true
      this.axios.get(api).then(response => {
        console.log(response.data)
        this.carts = response.data.data.carts
        this.cartsTotal = {
          total: response.data.data.total,
          final_total: response.data.data.final_total
        }
        this.isloading = false
      })
    },
    removeCart(id) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
      this.isloading = true
      this.axios.delete(api).then(response => {
        this.isloading = false
        this.getCart()
      })
    },
    addCouponCode() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`
      this.isloading = true
      const coupon = {
        code: this.coupon_code
      }
      this.axios.post(api, { data: coupon }).then(response => {
        this.isloading = false
        this.getCart()
      })
    },
    createOrder() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`
      const order = this.form
      this.isloading = true

      this.axios.post(api, { data: order }).then(response => {
        this.isloading = false
      })
    },
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    }
  }
}
</script>

<style lang="scss">
.views-the_customerorder {
  .card {
    position: relative;

    .b-card-img-stick {
      position: absolute;
      top: 0;
      left: 0;

      z-index: 1;
    }
  }
  .b-card-custom {
    height: 300px;
    .card-img-top {
      height: 50%;
    }
  }

  .c-card-text-title {
    font-size: 16px;
  }
  .c-card-text-content {
    font-size: 12px;
  }
  .c-card-text-description {
    font-size: 12px;
  }
}
</style>

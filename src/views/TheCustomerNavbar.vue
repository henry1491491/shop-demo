<template>
  <div id="views-thecustomer_navbar">
    <base-navbar
      v-show="$route.path === '/'"
      navbarHref="/"
      navbarTitle="Orchids 蘭花購物網"
    >
      <b-navbar-toggle target="nav-collapse" />
      <b-collapse
        id="nav-collapse"
        is-nav
      >
        <b-navbar-nav class="ml-auto">
          <b-dropdown
            size="sm"
            variant="link"
            toggle-class="text-decoration-none"
            no-caret
          >
            <template v-slot:button-content>
              <account-circle-outline
                id="account-circle-outline"
                class="text-secondary"
                href="#"
              />
              <b-tooltip
                target="account-circle-outline"
                variant="secondary"
              >
                管理員
              </b-tooltip>
            </template>
            <b-dropdown-item href="/admin/products">
              產品列表
            </b-dropdown-item>
            <b-dropdown-item href="/admin/orders">
              訂單列表
            </b-dropdown-item>
            <b-dropdown-item href="/admin/coopons">
              優惠券
            </b-dropdown-item>
          </b-dropdown>

          <b-nav-item>
            <heart-outline
              id="heart-outline"
              class="text-secondary"
              href="#"
              @click="goToContentFavor"
            />
            <b-tooltip
              target="heart-outline"
              variant="secondary"
            >
              心願清單
            </b-tooltip>
          </b-nav-item>

          <b-nav-item
            id="show-edit-product"
            href="#"
            @click="showCarts"
          >
            <cart-outline-icon
              id="cart-outline-icon"
              class="text-secondary"
            />
            <b-tooltip
              target="cart-outline-icon"
              variant="secondary"
            >
              購物車
            </b-tooltip>
            <b-badge
              v-if="cartsLength"
              href="#"
              variant="danger"
            >
              {{cartsLength}}
            </b-badge>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>

      <b-modal
        ref="show-cart-modal"
        size="xs"
        title="購物車"
      >
        <b-card>
          <h5
            v-show="!carts.length"
            class="text-center"
          >
            你的購物車沒有東西呢
          </h5>
          <b-table
            v-show="carts.length"
            :items="carts"
            :fields="cardfields"
            hover
            responsive
            small
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
                class="mr-1"
                size="sm"
                variant="outline-danger"
                @click="removeCart(row.item.id)"
              >
                <trash-can-outline />
              </b-button>
            </template>
          </b-table>
        </b-card>

        <template v-slot:modal-footer>
          <div
            v-show="carts.length"
            class="w-100"
          >
            <span class="mr-2">總計：{{cartsTotal.total}}</span>
            <span class="text-success h5">折扣價：{{cartsTotal.final_total}}</span>
            <b-button
              class="float-right"
              href="/customer_carts"
              size="sm"
              variant="danger"
            >
              到購物車
            </b-button>
          </div>
        </template>
      </b-modal>
    </base-navbar>

    <base-navbar
      v-show="$route.path === '/favor'"
      navbarHref="/favor"
      navbarTitle="心願清單"
    >
      <b-button
        class="ml-auto text-secondary"
        size="sm"
        variant="link"
        @click="$router.push('/customer_carts')"
      >
        購物車
      </b-button>
      <b-button
        class="text-secondary"
        size="sm"
        variant="link"
        @click="$router.push('/')"
      >
        回首頁
      </b-button>
    </base-navbar>

    <base-navbar
      v-show="$route.path === '/customer_carts' || $route.path === '/customer_carts_form' || $route.name === 'TheCustomerCheckout'"
      navbarHref="/customer_carts"
      navbarTitle="購物車"
    >
      <base-stepper :stepsProps="steps" />

      <b-button
        class="ml-auto text-secondary"
        size="sm"
        variant="link"
        @click="$router.push('/favor')"
      >
        心願清單
      </b-button>
      <b-button
        class="text-secondary"
        size="sm"
        variant="link"
        @click="$router.push('/')"
      >
        回首頁
      </b-button>
    </base-navbar>
  </div>
</template>

<script>
import { apiCustomerRemoveCart } from "../plugins/axios"
import BaseStepper from "../components/BaseStepper"

export default {
  name: "TheCustomerNavbar",
  components: {
    BaseStepper
  },
  data() {
    return {
      stepsData: [
        { text: "購物車內容", finished: false },
        { text: "訂購人資訊", finished: false },
        { text: "確認付款", finished: false }
      ],
      cardfields: [
        { key: "action", label: "" },
        { key: "title", label: "品名" },
        { key: "qty", label: "數量" },
        { key: "price", label: "單價" }
      ]
    }
  },
  computed: {
    isPaid() {
      return this.$store.state.customer.order.is_paid
    },
    steps() {
      if (this.$route.name === "TheCustomerShoppingCartContent") {
        return this.stepsData.map(el => {
          el.finished = false
          return el
        })
      } else if (this.$route.name === "TheCustomerShoppingCartForm") {
        return this.stepsData.map(el => {
          if (el.text === "購物車內容") {
            el.finished = true
            return el
          } else {
            return el
          }
        })
      } else if (this.$route.name === "TheCustomerCheckout" && !this.isPaid) {
        return this.stepsData.map(el => {
          if (el.text !== "確認付款") {
            el.finished = true
            return el
          } else {
            return el
          }
        })
      } else {
        return this.stepsData.map(el => {
          el.finished = true
          return el
        })
      }
    },
    cartsTotal() {
      return this.$store.state.customer.cartsTotal
    },
    carts() {
      return this.$store.state.customer.carts
    },
    cartsLength() {
      return this.$store.state.customer.carts.length
    }
  },
  mounted() {
    this.$store.dispatch("customer/getCart")
  },
  methods: {
    removeCart(id) {
      apiCustomerRemoveCart(id).then(response => {
        this.$store.dispatch("customer/getCart")
      })
    },
    showCarts() {
      this.$refs["show-cart-modal"].show()
    },
    async goToContentFavor() {
      this.$router.push("/favor")
    }
  }
}
</script>



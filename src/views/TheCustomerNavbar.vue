<template>
  <div id="views-thecustomer_navbar">
    <base-navbar
      v-show="$route.path === '/' || $route.name === 'TheCustomerContentProductDetail'"
      navbar-href="/"
      navbar-title="Orchids 市集"
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

            <router-link
              tag="b-dropdown-item"
              to="/admin/products"
            >
              產品列表
            </router-link>
            <router-link
              tag="b-dropdown-item"
              to="/admin/orders"
            >
              訂單列表
            </router-link>
            <router-link
              tag="b-dropdown-item"
              to="/admin/coopons"
            >
              優惠券
            </router-link>
          </b-dropdown>

          <b-nav-item>
            <heart-outline
              id="heart-outline"
              class="text-secondary"
              href="#"
              @click="goToFavor"
            />
            <b-tooltip
              target="heart-outline"
              variant="secondary"
            >
              願望清單
            </b-tooltip>
          </b-nav-item>

          <b-nav-item>
            <b-img
              id="coupon-img"
              height="24"
              src="https://image.flaticon.com/icons/svg/2527/2527719.svg"
              width="24"
              @click="goToCoupon"
            />
            <b-tooltip
              class="mt-1"
              target="coupon-img"
              variant="secondary"
            >
              優惠券
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
              {{ cartsLength }}
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
          <b-table-simple
            v-show="carts.length"
            caption-top
            hover
            outlined
            responsive
            small
          >
            <b-thead head-variant="light">
              <b-tr>
                <b-th>
                  <span class="ml-2">品名</span>
                </b-th>
                <b-th>數量</b-th>
                <b-th
                  colspan="2"
                  class="text-right"
                >
                  <span class="mr-2">單價</span>
                </b-th>
              </b-tr>
            </b-thead>
            <b-tbody>
              <b-tr
                v-for="item in carts"
                :key="item.id"
              >
                <b-td>
                  <b-button
                    class="text-danger"
                    size="sm"
                    variant="link"
                    @click="removeCart(item.id)"
                  >
                    <b-spinner
                      v-if="status.loadingItem === item.id"
                      label="Spinning"
                      small
                      variant="danger"
                    />
                    <trash-can-outline v-else />
                  </b-button>
                  {{ item.product.title }}
                  <span
                    v-if="item.coupon"
                    class="m-0 text-danger"
                  >(已套用優惠券)</span>
                </b-td>
                <b-td>{{ item.qty }} / {{ item.product.unit }}</b-td>
                <b-td
                  colspan="2"
                  class="text-right"
                >
                  <span class="mr-2">{{ item.final_total }}</span>
                </b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
        </b-card>
        <template v-slot:modal-footer>
          <div
            v-show="carts.length"
            class="w-100"
          >
            <span class="mr-2">總計：{{ cartsTotal.total }}</span>
            <span class="text-danger h5">折扣價：{{ cartsTotal.final_total }}</span>
            <b-button
              class="float-right"
              size="sm"
              variant="danger"
              @click="goToCustomerCart"
            >
              到購物車
            </b-button>
          </div>
        </template>
      </b-modal>
    </base-navbar>

    <base-navbar
      v-show="$route.path === '/favor'"
      navbar-href="/favor"
      navbar-title="願望清單"
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
      navbar-href="/customer_carts"
      navbar-title="購物車"
    >
      <b-row
        no-gutters
        class="d-flex align-items-center"
      >
        <b-col md="8">
          <base-stepper :steps-props="steps" />
        </b-col>
        <b-col
          class="text-right"
          md="4"
        >
          <b-button
            class="text-secondary"
            size="sm"
            variant="link"
            @click="$router.push('/favor')"
          >
            願望清單
          </b-button>
          <b-button
            class="text-secondary"
            size="sm"
            variant="link"
            @click="$router.push('/')"
          >
            回首頁
          </b-button>
        </b-col>
      </b-row>
    </base-navbar>

    <base-navbar
      v-show="$route.path === '/coupon'"
      navbar-href="/coupon"
      navbar-title="優惠券"
    >
      <b-button
        class="ml-auto text-secondary"
        size="sm"
        variant="link"
        @click="$router.push('/favor')"
      >
        願望清單
      </b-button>
      <b-button
        class="text-secondary"
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
  </div>
</template>

<script>
import { apiCustomerRemoveCart } from '../plugins/axios'
import BaseNavbar from '../components/BaseNavbar'
import BaseStepper from '../components/BaseStepper'

export default {
  name: 'TheCustomerNavbar',
  components: {
    BaseNavbar,
    BaseStepper
  },
  data () {
    return {
      stepsData: [
        { text: '購物車內容', finished: false },
        { text: '訂購人資訊', finished: false },
        { text: '確認付款', finished: false }
      ],
      cardfields: [
        { key: 'action', label: '' },
        { key: 'title', label: '品名' },
        { key: 'qty', label: '數量' },
        { key: 'price', label: '單價' }
      ]
    }
  },
  computed: {
    carts () {
      return this.$store.state.customer.carts
    },
    cartsLength () {
      return this.$store.state.customer.carts.length
    },
    cartsTotal () {
      return this.$store.state.customer.cartsTotal
    },
    isPaid () {
      return this.$store.state.customer.order.is_paid
    },
    status: {
      get () {
        return this.$store.state.customer.status
      },
      set (val) {
        this.$store.commit('customer/SET_STATUS_LOADINGITEM', val)
      }
    },
    steps () {
      if (this.$route.name === 'TheCustomerShoppingCartContent') {
        return this.stepsData.map(el => {
          el.finished = false
          return el
        })
      } else if (this.$route.name === 'TheCustomerShoppingCartForm') {
        return this.stepsData.map(el => {
          if (el.text === '購物車內容') {
            el.finished = true
            return el
          } else {
            return el
          }
        })
      } else if (this.$route.name === 'TheCustomerCheckout' && !this.isPaid) {
        return this.stepsData.map(el => {
          if (el.text !== '確認付款') {
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
    }
  },
  mounted () {
    this.$store.dispatch('customer/getCart')
  },
  methods: {
    async removeCart (id) {
      try {
        this.$store.commit('customer/SET_STATUS_LOADINGITEM', id)
        let response = await apiCustomerRemoveCart(id)
        if (!response.data.success) return
        response = await this.$store.dispatch('customer/getCart')
        if (!response.status) return
        this.$store.commit('customer/SET_STATUS_LOADINGITEM', '')
        this.$store.dispatch('alert/setMsgsAlert', this._$alert('已刪除', 'danger'))
      } catch (e) {
        console.log(e)
      }
    },
    showCarts () {
      this.$refs['show-cart-modal'].show()
    },
    goToCustomerCart () {
      this.$router.push('/customer_carts')
      window.setTimeout(() => {
        this.$refs['show-cart-modal'].hide()
      }, 200)
    },
    goToCoupon () {
      this.$router.push('/coupon')
    },
    goToFavor () {
      this.$router.push('/favor')
    }
  }
}
</script>

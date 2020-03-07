<template>
  <div id="views-thecustomer_navbar">
    <base-navbar
      v-show="$route.name === 'TheCustomer'"
      navbarHref="/customer"
      navbarTitle="Orchids 蘭花購物網"
    >
      <b-navbar-toggle target="nav-collapse" />
      <b-collapse
        id="nav-collapse"
        is-nav
      >
        <b-navbar-nav class="ml-auto">
          <b-nav-item>
            <heart-outline
              class="text-secondary"
              href="#"
              @click="goToContentFavor"
            />
          </b-nav-item>

          <b-nav-item
            id="show-edit-product"
            href="#"
            @click="showCarts"
          >
            <cart-outline-icon class="text-secondary" />
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
            <span>總計：{{cartsTotal.total}}</span>
            <span>折扣價：{{cartsTotal.final_total}}</span>
            <b-button
              class="float-right"
              href="/customer/customer_carts"
              size="sm"
              variant="primary"
            >
              直接購買
            </b-button>
          </div>
        </template>
      </b-modal>
    </base-navbar>

    <base-navbar
      v-show="$route.name === 'TheCustomerContentFavor'"
      navbarHref="/customer/favor"
      navbarTitle="心願清單"
    >
      <b-button
        class="ml-auto text-secondary"
        href="/customer"
        size="sm"
        variant="link"
      >
        回首頁
      </b-button>
    </base-navbar>

    <base-navbar
      v-show="$route.name === 'TheCustomerShoppingCartContent'"
      navbarHref="/customer_carts"
      navbarTitle="購物車"
    >
      <b-button
        class="ml-auto text-secondary"
        href="/customer"
        size="sm"
        variant="link"
      >
        回首頁
      </b-button>
    </base-navbar>
  </div>
</template>

<script>
import { apiCustomerRemoveCart } from "../plugins/axios"

export default {
  name: "TheCustomerNavbar",
  data() {
    return {
      cardfields: [
        { key: "action", label: "" },
        { key: "title", label: "品名" },
        { key: "qty", label: "數量" },
        { key: "price", label: "單價" }
      ]
    }
  },
  computed: {
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
    goToContentFavor() {
      if (this.$route.name === "TheCustomerContentFavor") return
      this.$router.push("customer/favor")
    }
  }
}
</script>



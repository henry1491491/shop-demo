<template>
  <div id="views-theshoppingcart_content">
    <div v-show="carts.length">
      <b-table
        :items="carts"
        :fields="cardfields"
        hover
        responsive
        small
        stacked="md"
      >
        <template v-slot:cell(title)="data">
          <p class="m-0">
            {{data.item.product.title}}
          </p>
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
            placeholder="請輸入優惠碼"
            type="text"
          />
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
    </div>
    <div v-show="!carts.length">
      <b-card>
        <b-card-text class="text-center">
          購物車沒有東西喔！
        </b-card-text>
      </b-card>
    </div>
  </div>
</template>


<script>
import {
  apiCustomerRemoveCart,
  apiCustomerAddCouponCode
} from "../plugins/axios"

export default {
  name: "TheCustomerShoppingCartContent",
  data() {
    return {
      cardfields: [
        { key: "action", label: "" },
        { key: "title", label: "品名" },
        { key: "qty", label: "數量" },
        { key: "price", label: "單價" }
      ],
      coupon_code: ""
    }
  },
  computed: {
    carts() {
      return this.$store.state.customer.carts
    },
    cartsTotal() {
      return this.$store.state.customer.cartsTotal
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
    addCouponCode() {
      const coupon = {
        code: this.coupon_code
      }
      apiCustomerAddCouponCode({ data: coupon }).then(response => {
        this.$tore.dispatch("customer/getCart")
      })
    }
  }
}
</script>


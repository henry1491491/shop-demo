<template>
  <div id="views-theshoppingcart_content">
    <div
      v-if="carts.length"
      class="mt-2"
    >
      <b-table-simple
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
              class="text-right mr-3"
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
                class="m-0 text-success"
              >(已套用優惠券)</span>
            </b-td>
            <b-td>{{ item.qty }} / {{ item.product.unit }}</b-td>
            <b-td
              colspan="2"
              class="text-right mr-3"
            >
              <span class="mr-2">{{ item.final_total }}</span>
            </b-td>
          </b-tr>
        </b-tbody>
      </b-table-simple>

      <b-card>
        <b-card-text class="text-right m-0 p-1">
          總計：{{cartsTotal.total}}
        </b-card-text>

        <b-card-text
          v-show="cartsTotal.final_total !== cartsTotal.total"
          class="card-text-price text-right text-success m-0 p-1"
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

      <div class="d-flex justify-content-end">
        <b-button
          class="mt-2"
          size="sm"
          variant="danger"
          @click="$router.push('/customer_carts_form')"
        >
          下一步
        </b-button>
      </div>
    </div>

    <div v-else>
      <b-card>
        <b-card-text class="text-center">
          購物車沒有東西喔！
        </b-card-text>
      </b-card>
      <div class="d-flex justify-content-end">
        <b-button
          class="mt-2 mr-2"
          size="sm"
          variant="primary"
          @click="$router.push('/')"
        >
          回首頁
        </b-button>
        <b-button
          class="mt-2"
          size="sm"
          variant="danger"
          @click="$router.push('/favor')"
        >
          心願清單
        </b-button>
      </div>
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
    this.$store.dispatch("customer/getCart")
  },
  methods: {
    async removeCart(id) {
      this.$store.commit("customer/SET_STATUS_LOADINGITEM", id)
      let response = await apiCustomerRemoveCart(id)
      if (!response.data.success) return
      response = await this.$store.dispatch("customer/getCart")
      if (!response.status) return
      this.$store.commit("customer/SET_STATUS_LOADINGITEM", "")
    },
    async addCouponCode() {
      const coupon = {
        code: this.coupon_code
      }
      let response = await apiCustomerAddCouponCode({ data: coupon })
      if (!response.data.success) return
      this.$store.dispatch("customer/getCart")
    }
  }
}
</script>



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
              <span class="mr-2">{{ Math.round(item.final_total) }}</span>
              <span
                v-if="item.coupon"
                class="text-success"
              >(折扣後)</span>
            </b-td>
          </b-tr>
        </b-tbody>
      </b-table-simple>

      <b-card>
        <b-card-text class="text-right m-0 p-1">
          總計：{{ Math.round(cartsTotal.total) }}
        </b-card-text>

        <b-card-text
          v-show="cartsTotal.final_total !== cartsTotal.total"
          class="card-text-price text-right text-success m-0 p-1"
        >
          折扣價：{{ Math.round(cartsTotal.final_total) }}
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
              @click="addCouponCode(cartsTotal.total,coupon_code)"
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

    <v-skeleton-loader
      v-if="!loading"
      class="mx-auto"
      type="table"
    />

    <div v-if="!carts.length && loading">
      <base-card-empty card-text="你的購物車沒有東西喔！" />

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
import { extend, validate } from 'vee-validate'

import {
  apiCustomerRemoveCart,
  apiCustomerAddCouponCode
} from '../plugins/axios'

export default {
  name: 'TheCustomerShoppingCartContent',
  data () {
    return {
      cardfields: [
        { key: 'action', label: '' },
        { key: 'title', label: '品名' },
        { key: 'qty', label: '數量' },
        { key: 'price', label: '單價' }
      ],
      coupon_code: '',
      loading: false
    }
  },
  computed: {
    carts () {
      return this.$store.state.customer.carts
    },
    cartsTotal () {
      return this.$store.state.customer.cartsTotal
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
    this.getCart()
  },
  methods: {
    async getCart () {
      try {
        this.loading = false
        const result = await this.$store.dispatch('customer/getCart')
        if (!result.status) return
        this.loading = true
        if (!this.carts.length) {
          this.showEmptyCard = true
        }
      } catch (e) {
        console.log(e)
      }
    },
    async addCouponCode (total, code) {
      try {
        const validateStatus = await this.couponValidate(total, code)
        if (!validateStatus) return
        const coupon = {
          code: this.coupon_code
        }
        const response = await apiCustomerAddCouponCode({ data: coupon })
        if (!response.data.success) return
        const result = await this.$store.dispatch('customer/getCart')
        if (!result.status) return
        this.$store.dispatch('alert/setMsgsAlert', this._$alert('已輸入優惠碼'))
      } catch (e) {
        console.log(e)
      }
    },
    async couponValidate (total, code) {
      try {
        const couponPrice = parseInt(code.replace(/[a-z]/g, ''))
        extend('coupon_can_use', total => {
          if (total > couponPrice) {
            return true
          }
          return '您的金額不能使用這個優惠券喔'
        })
        const isValidate = await validate(total, 'coupon_can_use')
        console.log(isValidate)
        if (!isValidate.errors.length) return true
        this.$store.dispatch('alert/setMsgsAlert', this._$alert(isValidate.errors, 'danger'))
      } catch (e) {
        console.log(e)
      }
    },
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
    }
  }
}
</script>

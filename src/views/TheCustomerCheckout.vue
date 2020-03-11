<template>
  <div id="views-thecustomer_checkout">
    <b-card class="my-4 justify-content-center">
      <b-form @submit="payOrder">
        <b-row>
          <b-col>
            <b-table-simple
              caption-top
              hover
              outlined
              responsive
              small
            >
              <b-thead head-variant="light">
                <b-tr>
                  <b-th>品名</b-th>
                  <b-th>數量</b-th>
                  <b-th
                    colspan="2"
                    class="text-right mr-3"
                  >單價</b-th>
                  <b-th></b-th>
                </b-tr>
              </b-thead>

              <b-tbody>
                <b-tr
                  v-for="item in order.products"
                  :key="item.id"
                >
                  <b-td>{{ item.product.title }}</b-td>
                  <b-td>{{ item.qty }} / {{ item.product.unit }}</b-td>
                  <b-td
                    colspan="2"
                    class="text-right mr-3"
                  >{{ item.final_total }}</b-td>
                  <b-td></b-td>
                </b-tr>
              </b-tbody>

              <b-tfoot>
                <b-tr>
                  <b-td colspan="2">總計：</b-td>
                  <b-td
                    colspan="2"
                    class="text-right mr-3"
                  >{{ order.total }}</b-td>
                  <b-td></b-td>
                </b-tr>
              </b-tfoot>
            </b-table-simple>
          </b-col>
          <b-col>
            <b-table-simple
              caption-top
              hover
              outlined
              responsive
              small
            >
              <b-thead head-variant="light">
                <b-tr>
                  <b-th colspan="2">收件人資訊</b-th>
                </b-tr>
              </b-thead>
              <b-tbody>
                <b-tr>
                  <b-th>Email</b-th>
                  <b-td>{{ order.user.email }}</b-td>
                </b-tr>
                <b-tr>
                  <b-th>姓名</b-th>
                  <b-td>{{ order.user.name }}</b-td>
                </b-tr>
                <b-tr>
                  <b-th>收件人電話</b-th>
                  <b-td>{{ order.user.tel }}</b-td>
                </b-tr>
                <b-tr>
                  <b-th>收件人地址</b-th>
                  <b-td>{{ order.user.address }}</b-td>
                </b-tr>
                <b-tr>
                  <b-th>付款狀態</b-th>
                  <b-td>
                    <span v-if="!order.is_paid">尚未付款</span>
                    <span
                      v-else
                      class="text-success"
                    >付款完成</span>
                  </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-col>
        </b-row>

        <b-button
          v-if="order.is_paid === false"
          class="float-right"
          size="sm"
          variant="outline-danger"
          @click="payOrder"
        >
          確認付款去
        </b-button>
      </b-form>
    </b-card>
  </div>
</template>


<script>
import { apiCustomerGetOrder, apiCustomerPayOrder } from "../plugins/axios"

export default {
  name: "TheDashboardCustomerCheckout",
  data() {
    return {
      order: {
        user: {}
      },
      orderId: ""
    }
  },
  mounted() {
    this.orderId = this.$route.params.orderId
    this.getOrder()
  },
  methods: {
    async getOrder() {
      let response = await apiCustomerGetOrder(this.orderId)
      if (!response.data.success) return
      this.order = response.data.order
      this.$store.commit("customer/SET_ORDER", this.order)
      return this.order
    },
    async payOrder() {
      let response = await apiCustomerPayOrder(this.orderId)
      if (!response.data.success) return
      this.getOrder()
    }
  }
}
</script>

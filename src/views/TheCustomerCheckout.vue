<template>
  <div class="views-thecustomer_checkout">
    <b-card class="my-5 justify-content-center">
      <b-form
        class="col-md-6"
        @submit="onSubmit"
      >
        <b-table-simple
          caption-top
          hover
          responsive
          small
        >
          <b-thead head-variant="dark">
            <b-tr>
              <b-th>品名</b-th>
              <b-th>數量</b-th>
              <b-th>單價</b-th>
            </b-tr>
          </b-thead>

          <b-tbody>
            <b-tr
              v-for="item in order.products"
              :key="item.id"
            >
              <b-td>{{ item.product.title }}</b-td>
              <b-td>{{ item.qty }}/{{ item.product.unit }}</b-td>
              <b-td>{{ item.final_total }}</b-td>
            </b-tr>
          </b-tbody>

          <b-tfoot>
            <b-tr>
              <b-td>總計：</b-td>
              <b-td>{{ order.total }}</b-td>
            </b-tr>
          </b-tfoot>
        </b-table-simple>

        <b-table-simple
          caption-top
          hover
          responsive
          small
        >
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

        <b-button
          v-if="order.is_paid === false"
          class="text-right"
          variant="outline-danger"
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
    getOrder() {
      const order = this.form
      //this.isloading = true
      apiCustomerGetOrder(this.orderId).then(response => {
        this.order = response.data.order
        //this.isloading = false
      })
    },
    payOrder() {
      const order = this.form
      //this.isloading = true
      apiCustomerGetOrder(this.orderId).then(response => {
        if (!response.data.success) return
        this.getOrder()
        //this.isloading = false
      })
    }
  }
}
</script>

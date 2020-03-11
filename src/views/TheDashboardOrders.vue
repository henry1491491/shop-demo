<template>
  <b-container
    id="views-thedashboard_orders"
    fluid
  >
    <b-modal
      ref="edit-order-modal"
      size="lg"
      title="BootstrapVue"
    >
      <b-row class="my-1">
        <b-col sm="2">
          <label for="input-small">
            顧客信箱
          </label>
        </b-col>
        <b-col sm="10">
          <b-form-input
            id="email"
            v-model="tempOrder.user.email"
            placeholder="修改顧客信箱"
            size="sm"
          />
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="2">
          <label for="input-small">
            顧客住址
          </label>
        </b-col>
        <b-col sm="10">
          <b-form-input
            id="address"
            v-model="tempOrder.user.address"
            placeholder="修改顧客住址"
            size="sm"
          />
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="2">
          <label for="input-small">
            顧客姓名
          </label>
        </b-col>
        <b-col sm="10">
          <b-form-input
            id="name"
            v-model="tempOrder.user.name"
            placeholder="修改顧客姓名"
            size="sm"
          />
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="2">
          <label for="input-small">
            顧客電話
          </label>
        </b-col>
        <b-col sm="10">
          <b-form-input
            id="tel"
            v-model="tempOrder.user.tel"
            placeholder="修改顧客電話"
            size="sm"
          />
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="2">
          <label for="input-small">
            應付金額
          </label>
        </b-col>
        <b-col sm="10">
          <b-form-input
            id="total"
            v-model="tempOrder.total"
            placeholder="修改應付金額"
            size="sm"
          />
        </b-col>
      </b-row>

      <b-form-checkbox
        id="checkbox-1"
        v-model="tempOrder.is_paid"
        name="checkbox-1"
        unchecked-value="false"
        value="true"
      >
        是否付款
      </b-form-checkbox>

      <template v-slot:modal-footer>
        <div class="w-100">
          <b-button
            class="float-right"
            size="md"
            variant="primary"
            @click="updateOrder"
          >
            確認
          </b-button>
          <b-button
            class="mr-1 float-right"
            size="md"
            variant="danger"
            @click="cancerEditOrder"
          >
            取消
          </b-button>
        </div>
      </template>
    </b-modal>

    <b-table
      v-if="!isLoading"
      :items="orders"
      :fields="fields"
      responsive
      small
      striped
      stacked="md"
    >
      <template v-slot:cell(create_at)="data">
        {{data.item.create_at | moment(`YYYY年M月D日 HH:mm:ss`)}}
      </template>

      <template v-slot:cell(user)="data">
        {{ data.item.user.email }}
      </template>

      <template v-slot:cell(products)="data">
        <p
          v-for="(product,i) in data.item.products"
          :key="i"
        >
          {{ product.product.title }} 數量：{{ product.qty }}
          {{ product.product.unit }}
        </p>
      </template>

      <template v-slot:cell(total)="data">
        {{data.item.total | currency}}
      </template>

      <template v-slot:cell(paid_date)="data">
        {{data.item.paid_date | moment(`YYYY年M月D日 HH:mm:ss`)}}
      </template>

      <template v-slot:cell(is_paid)="data">
        <p
          v-show="data.item.is_paid"
          class="text-success"
        >
          已付款
        </p>
        <p
          v-show="!data.item.is_paid"
          class="text-danger"
        >
          尚未付款
        </p>
      </template>

      <template v-slot:cell(actions)="row">
        <b-button
          class="mr-1"
          size="sm"
          @click="showEditOrder(false,row.item)"
        >
          編輯
        </b-button>
      </template>

    </b-table>

    <b-pagination-default
      :pagination="pagination"
      @paginate="getOrders"
    />
  </b-container>
</template>

<script>
import { apiAdminGetOrders } from "../plugins/axios"

export default {
  name: "TheDashboardOrders",
  data() {
    return {
      fields: [
        {
          key: "create_at",
          label: "購買時間"
        },
        {
          key: "user",
          label: "顧客資訊"
        },
        {
          key: "products",
          label: "購買款項"
        },
        { key: "total", label: "應付金額" },
        { key: "paid_date", label: "付款日期" },
        {
          key: "is_paid",
          label: "是否付款"
        },
        { key: "actions", label: "編輯" }
      ],
      isNew: false,
      orders: [],
      pagination: {},
      tempOrder: {
        create_at: null,
        is_paid: false,
        message: "",
        payment_method: "",
        products: [],
        total: null,
        user: {}
      }
    }
  },
  computed: {
    loadingAmount() {
      return this.$store.state.loadingAmount
    },
    isLoading() {
      if (this.loadingAmount > 0) {
        return true
      } else {
        return false
      }
    }
  },
  mounted() {
    this.getOrders()
  },
  methods: {
    showEditOrder(isNew, item) {
      if (isNew) {
        this.tempOrder = {}
        this.isNew = true
      } else {
        this.tempOrder = Object.assign({}, item)
        this.isNew = false
      }
      this.$refs["edit-order-modal"].show()
    },
    cancerEditOrder() {
      this.$refs["edit-order-modal"].hide()
    },
    getOrders(page = 1) {
      this.loading = true
      apiAdminGetOrders(page).then(response => {
        this.loading = false
        this.orders = response.data.orders
        this.pagination = response.data.pagination
      })
    },
    updateOrder() {
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/order`
      let httpMethod = "post"
      if (!this.isNew) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${this.tempOrder.id}`
        httpMethod = "put"
      }
      this.axios[httpMethod](api, { data: this.tempOrder }).then(response => {
        if (response.data.success) {
          this.$refs["edit-order-modal"].hide()
          this.getOrders()
        } else {
          this.$refs["edit-order-modal"].hide()
          this.getOrders()
          console.log("新增失敗")
        }
      })
    }
  }
}
</script>

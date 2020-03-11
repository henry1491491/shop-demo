<template>
  <b-container
    id="views-thedashboard_coupons"
    fluid
  >
    <b-button
      id="show-edit-coupons"
      class="m-3 float-right"
      @click="showEditCoupon(true)"
    >
      建立優惠券
    </b-button>

    <b-modal
      ref="edit-coupon-modal"
      size="lg"
      title="BootstrapVue"
    >
      <b-row class="my-1">
        <b-col sm="2">
          <label for="input-coupon-title">優惠券名稱</label>
        </b-col>
        <b-col sm="10">
          <b-form-input
            id="input-coupon-title"
            v-model="tempCoupon.title"
            placeholder="輸入優惠券名稱"
            size="sm"
          />
        </b-col>
      </b-row>

      <b-row class="my-1">
        <b-col sm="2">
          <label for="input-coupon-percent">折扣百分比</label>
        </b-col>
        <b-col sm="10">
          <b-form-input
            id="input-coupon-percent"
            v-model="tempCoupon.percent"
            placeholder="輸入折扣百分比"
            size="sm"
          />
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="2">
          <label for="input-coupon-duedate">到期日</label>
        </b-col>
        <b-col sm="10">
          <b-form-datepicker
            id="input-coupon-duedate"
            v-model="tempCoupon.due_date"
            class="mb-2"
          />
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="2">
          <label for="input-coupon-code">優惠碼</label>
        </b-col>
        <b-col sm="10">
          <b-form-input
            id="input-coupon-code"
            v-model="tempCoupon.code"
            placeholder="輸入優惠碼"
            size="sm"
          />
        </b-col>
      </b-row>

      <b-row class="my-1">
        <b-col sm="2">
          <label for="input-coupon-isenabled">是否啟用</label>
        </b-col>
        <b-col sm="10">
          <b-form-radio-group
            id="input-coupon-isenabled"
            v-model="tempCoupon.is_enabled"
            :options="isEnableOptions"
            name="input-coupon-isenabled"
          />
        </b-col>
      </b-row>

      <template v-slot:modal-footer>
        <div class="w-100">
          <b-button
            class="float-right"
            size="md"
            variant="primary"
            @click="updateCoupon"
          >
            確認
          </b-button>
          <b-button
            class="mr-1 float-right"
            size="md"
            variant="danger"
            @click="cancerEditCoupon"
          >
            取消
          </b-button>
        </div>
      </template>
    </b-modal>

    <b-table
      v-if="!isLoading"
      :items="coupons"
      :fields="fields"
      responsive
      small
      striped
      stacked="md"
    >

      <template v-slot:cell(is_enabled)="data">
        <p
          v-show="data.item.is_enabled"
          class="text-success"
        >
          是
        </p>
        <p
          v-show="!data.item.is_enabled"
          class="text-danger"
        >
          否
        </p>
      </template>

      <template v-slot:cell(actions)="row">
        <b-button
          class="mr-1"
          size="sm"
          @click="showEditCoupon(false,row.item)"
        >
          編輯
        </b-button>
        <b-button
          class="mr-1"
          size="sm"
          @click="deleteCoupon(row.item)"
        >
          刪除
        </b-button>
      </template>
    </b-table>

    <b-pagination-default
      :pagination="pagination"
      @paginate="getCoupons"
    />

  </b-container>
</template>

<script>
import { apiAdminGetCoupons, apiAdminDeleteCoupons } from "../plugins/axios"

export default {
  name: "TheDashboardCoupons",
  data() {
    return {
      coupons: [],
      fields: [
        {
          key: "title",
          label: "名稱"
        },
        {
          key: "percent",
          label: "折扣百分比"
        },
        {
          key: "due_date",
          label: "到期日"
        },
        {
          key: "is_enabled",
          label: "是否啟用"
        },
        { key: "actions", label: "編輯" }
      ],
      file: null,
      isEnableOptions: [
        { text: "是", value: 1 },
        { text: "否", value: 0 }
      ],
      isNew: false,
      pagination: {},
      tempCoupon: {
        title: "",
        percent: null,
        due_date: null,
        is_enabled: 1
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
    this.getCoupons()
  },
  methods: {
    showEditCoupon(isNew, item) {
      if (isNew) {
        this.tempCoupon = {}
        this.isNew = true
      } else {
        this.tempCoupon = Object.assign({}, item)
        this.isNew = false
      }
      this.$refs["edit-coupon-modal"].show()
    },
    cancerEditCoupon() {
      this.$refs["edit-coupon-modal"].hide()
    },
    deleteCoupon(item) {
      apiAdminDeleteCoupons(item).then(response => {
        this.getCoupons()
      })
    },
    updateCoupon() {
      let api = `/admin/coupon`
      let httpMethod = "post"
      if (!this.isNew) {
        api = `/admin/coupon/${this.tempCoupon.id}`
        httpMethod = "put"
      }
      this.axios[httpMethod](api, { data: this.tempCoupon }).then(response => {
        if (response.data.success) {
          this.$refs["edit-coupon-modal"].hide()
          this.getCoupons()
        } else {
          this.$refs["edit-coupon-modal"].hide()
          this.getCoupons()
          console.log("新增失敗")
        }
      })
    },
    getCoupons(page = 1) {
      this.loading = true
      apiAdminGetCoupons(page).then(response => {
        this.loading = false
        this.coupons = response.data.coupons
        this.pagination = response.data.pagination
      })
    }
  }
}
</script>

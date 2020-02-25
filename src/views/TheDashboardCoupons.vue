<template>
  <b-container
    fluid
    class="views-the_dashboard_coupons"
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
            v-model="tempCoupon.title"
            id="input-coupon-title"
            size="sm"
            placeholder="輸入優惠券名稱"
          ></b-form-input>
        </b-col>
      </b-row>

      <b-row class="my-1">
        <b-col sm="2">
          <label for="input-coupon-percent">折扣百分比</label>
        </b-col>
        <b-col sm="10">
          <b-form-input
            v-model="tempCoupon.percent"
            id="input-coupon-percent"
            size="sm"
            placeholder="輸入折扣百分比"
          ></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="2">
          <label for="input-coupon-duedate">到期日</label>
        </b-col>
        <b-col sm="10">
          <b-form-datepicker
            v-model="tempCoupon.due_date"
            id="input-coupon-duedate"
            class="mb-2"
          ></b-form-datepicker>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="2">
          <label for="input-coupon-code">優惠碼</label>
        </b-col>
        <b-col sm="10">
          <b-form-input
            v-model="tempCoupon.code"
            id="input-coupon-code"
            size="sm"
            placeholder="輸入優惠碼"
          ></b-form-input>
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
            :options="options"
            name="input-coupon-isenabled"
          />
        </b-col>
      </b-row>

      <template v-slot:modal-footer>
        <div class="w-100">
          <b-button
            variant="primary"
            size="md"
            class="float-right"
            @click="updateCoupon"
          >
            確認
          </b-button>
          <b-button
            variant="danger"
            size="md"
            class="mr-1 float-right"
            @click="cancerEditCoupon"
          >
            取消
          </b-button>
        </div>
      </template>
    </b-modal>

    <content-loader-table
      :loading.sync="loading"
      :width="contentLoaderOptions.width"
      :height="contentLoaderOptions.height"
      :speed="contentLoaderOptions.speed"
    />

    <b-table
      v-if="!loading"
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
          size="sm"
          class="mr-1"
          @click="showEditCoupon(false,row.item)"
        >
          編輯
        </b-button>
        <b-button
          size="sm"
          class="mr-1"
          @click="deleteCoupon(row.item)"
        >
          刪除
        </b-button>
      </template>
    </b-table>

    <b-pagination-default
      :pagination="pagination"
      v-on:paginate="getCoupons"
    />

  </b-container>
</template>

<script>
export default {
  name: "TheDashboardCoupons",
  data() {
    return {
      options: [
        { text: "是", value: 1 },
        { text: "否", value: 0 }
      ],
      contentLoaderOptions: {
        width: 850,
        height: 430,
        speed: 2
      },
      loading: false,
      tempCoupon: {
        title: "",
        percent: null,
        due_date: null,
        is_enabled: 1
      },
      isNew: false,
      file: null,
      coupons: [],
      pagination: {},
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
      ]
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
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${item.id}`
      this.axios.delete(api).then(response => {
        this.getCoupons()
      })
    },
    updateCoupon() {
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`
      let httpMethod = "post"
      if (!this.isNew) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${this.tempCoupon.id}`
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
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${page}`
      this.loading = true
      this.axios.get(api).then(response => {
        this.loading = false
        this.coupons = response.data.coupons
        this.pagination = response.data.pagination
      })
    }
  }
}
</script>

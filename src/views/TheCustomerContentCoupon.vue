<template>
  <div id="views-thecustomer_contentcoupons">
    <b-row v-if="isLoading">
      <b-col
        v-for="i in 4"
        :key="i"
        md="6"
        sm="12"
      >
        <v-skeleton-loader type="card" />
      </b-col>
    </b-row>

    <b-row v-if="!isLoading">
      <b-col
        v-for="item in coupons"
        :key="item.id"
        md="6"
        sm="12"
      >
        <b-card class="my-2">
          <b-row>
            <b-col
              class="card-coupon-left my-0"
              md="4"
              no-gutters
            >
              <div class="dot-top"></div>
              <b-card-title class="text-center">
                {{item.title}}
              </b-card-title>
              <b-card-text class="text-center">
                <b-button
                  class="btn-left"
                  disabled
                  size="sm"
                  variant="danger"
                >
                  {{item.percent * 0.1}} 折
                </b-button>
                <b-button
                  class="btn-right"
                  disabled
                  size="sm"
                  variant="outline-danger"
                >
                  {{item.code}}
                </b-button>
              </b-card-text>
              <div class="dot-bottom"></div>
            </b-col>
            <b-col
              class="text-center"
              md="8"
            >
              <b-button
                size="sm"
                class="text-center mb-3"
                variant="outline-primary"
                v-clipboard:copy="item.code"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError"
              >
                複製優惠碼
              </b-button>
              <b-card-text class="text-center">
                到期日:{{item.due_date}}
              </b-card-text>
            </b-col>
          </b-row>

        </b-card>

      </b-col>
    </b-row>
  </div>
</template>

<script>
import { apiAdminGetCoupons } from "../plugins/axios"

export default {
  name: "TheCustomerContentCoupon",
  data() {
    return {
      coupons: []
    }
  },
  mounted() {
    this.getCoupons()
  },
  computed: {
    isLoading() {
      return this.$store.getters.isLoading
    }
  },
  methods: {
    async getCoupons(page = 1) {
      let response = await apiAdminGetCoupons(page)
      if (!response.data.success) return
      this.coupons = response.data.coupons
    },
    onCopy(e) {
      this.$store.dispatch("alert/setMsgsAlert", {
        duration: 2000,
        id: Math.floor(new Date() / 1000),
        msg: "已複製優惠碼",
        variant: "warning"
      })
    },
    onError() {
      console.log("failed")
    }
  }
}
</script>

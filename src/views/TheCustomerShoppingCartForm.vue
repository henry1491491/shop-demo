<template>
  <div id="views-theshoppingcart_form">
    <h3 class="mt-2">填寫基本資料</h3>
    <b-card>
      <validation-observer
        v-slot="{ passes }"
        ref="observer"
      >
        <b-form
          v-if="show"
          @submit.prevent="passes(createOrder)"
        >
          <validation-provider
            v-slot="validationContext"
            name="信箱"
            rules="required|email"
          >
            <b-form-group
              id="input-email"
              label="信箱"
              label-for="input-email"
            >
              <b-form-input
                id="input-email"
                v-model="form.user.email"
                :state="getValidationState(validationContext)"
                placeholder="請輸入信箱"
                required
              />
              <b-form-invalid-feedback id="input-1-live-feedback">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <validation-provider
            v-slot="validationContext"
            name="姓名"
            rules="required"
          >
            <b-form-group
              id="input-name"
              label="收件人姓名"
              label-for="input-name"
            >
              <b-form-input
                id="input-name"
                v-model="form.user.name"
                :state="getValidationState(validationContext)"
                placeholder="請輸入姓名"
                required
              />
              <b-form-invalid-feedback id="input-1-live-feedback">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <validation-provider
            v-slot="validationContext"
            name="電話"
            rules="required"
          >
            <b-form-group
              id="input-tel"
              label="收件人電話"
              label-for="input-tel"
            >
              <b-form-input
                id="input-tel"
                v-model="form.user.phone"
                :state="getValidationState(validationContext)"
                placeholder="請輸入電話"
                required
              />
              <b-form-invalid-feedback id="input-1-live-feedback">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <validation-provider
            v-slot="validationContext"
            name="地址"
            rules="required"
          >
            <b-form-group
              id="input-address"
              label="收件人地址"
              label-for="input-address"
            >
              <b-form-input
                id="input-address"
                v-model="form.user.address"
                :state="getValidationState(validationContext)"
                placeholder="請輸入地址"
                required
              />
              <b-form-invalid-feedback id="input-1-live-feedback">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <validation-provider
            v-slot="validationContext"
            name="留言"
            rules="max:300"
          >
            <b-form-group
              id="input-msgs"
              label="留言"
              label-for="input-msg"
            >
              <b-form-textarea
                id="input-msgs"
                v-model="form.message"
                :state="getValidationState(validationContext)"
                max-rows="6"
                placeholder="說點什麼⋯⋯"
                rows="3"
              />
              <b-form-invalid-feedback id="input-1-live-feedback">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <b-button
            size="sm"
            type="submit"
            variant="primary"
            @click="createOrder"
          >
            提交
          </b-button>
        </b-form>
      </validation-observer>
    </b-card>
  </div>
</template>

<script>
import { apiCustomerCreateOrder } from "../plugins/axios"

export default {
  name: "TheCustomerShoppingCartForm",
  data() {
    return {
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: ""
        },
        message: ""
      },
      show: true
    }
  },
  methods: {
    createOrder() {
      const order = this.form
      apiCustomerCreateOrder({ data: order }).then(response => {
        if (!response.data.success) return
        this.$router.push(`/customer_checkout/${response.data.orderId}`)
      })
    },
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    }
  }
}
</script>


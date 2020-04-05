<template>
  <div id="views-theshoppingcart_form">
    <h3 class="my-4">
      填寫基本資料
    </h3>

    <b-card>
      <b-row>
        <b-col cols="6">
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
                class="float-right"
                size="sm"
                type="submit"
                variant="primary"
                @click="passes(createOrder)"
              >
                提交
              </b-button>
            </b-form>
          </validation-observer>
        </b-col>
        <b-col
          cols="6"
          class="d-flex justify-content-center mt-5"
        >
          <v-svg-form />
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import { apiCustomerCreateOrder } from '../plugins/axios'
import VSvgForm from '../components/VSvgForm'

export default {
  name: 'TheCustomerShoppingCartForm',
  components: {
    VSvgForm
  },
  data () {
    return {
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      show: true
    }
  },
  methods: {
    async createOrder () {
      try {
        const order = this.form
        const response = await apiCustomerCreateOrder({ data: order })
        if (!response.data.success) return
        this.$router.push(`/customer_checkout/${response.data.orderId}`)
      } catch (e) {
        console.log(e)
      }
    },
    getValidationState ({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    }
  }
}
</script>

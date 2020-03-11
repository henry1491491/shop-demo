<template>
  <div id="views-thelogin">
    <b-card title="請登入">
      <validation-observer
        v-slot="{ passes }"
        ref="observer"
      >
        <b-form
          v-if="show"
          @submit.prevent="passes(signIn)"
        >
          <validation-provider
            v-slot="validationContext"
            name="信箱"
            rules="required|email"
          >

            <b-form-group
              id="input-group-1"
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                v-model="user.username"
                :state="getValidationState(validationContext)"
                placeholder="請輸入帳號"
                required
              >
              </b-form-input>
              <b-form-invalid-feedback id="input-1-live-feedback">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <validation-provider
            v-slot="validationContext"
            name="密碼"
            rules="required|min:6|max:12"
          >
            <b-form-group
              id="input-group-2"
              label-for="input-2"
            >
              <b-form-input
                id="input-2"
                v-model="user.password"
                :state="getValidationState(validationContext)"
                placeholder="請輸入密碼"
                required
                type="password"
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
            @click="signIn"
          >
            提交
          </b-button>
        </b-form>
      </validation-observer>
    </b-card>
  </div>
</template>

<script>
import { apiLogLogin } from "../plugins/axios"

export default {
  data() {
    return {
      form: {
        email: "",
        name: "",
        food: null,
        checked: []
      },
      show: true,
      user: {
        username: "",
        password: ""
      }
    }
  },
  methods: {
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    },
    signIn() {
      apiLogLogin(this.user).then(response => {
        if (!response.data.success) return
        this.$router.push("/admin/products")
      })
    }
  }
}
</script>



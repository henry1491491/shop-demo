<template>
  <div class="views-the_login">
    <b-card title="請登入">
      <validation-observer
        ref="observer"
        v-slot="{ passes }"
      >
        <b-form
          @submit.prevent="passes(signIn)"
          v-if="show"
        >
          <validation-provider
            name="信箱"
            rules="required|email"
            v-slot="validationContext"
          >

            <b-form-group
              id="input-group-1"
              label=""
              label-for="input-1"
            >
              <b-form-input
                v-model="user.username"
                :state="getValidationState(validationContext)"
                id="input-1"
                required
                placeholder="請輸入帳號"
              >
              </b-form-input>
              <b-form-invalid-feedback id="input-1-live-feedback">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <validation-provider
            name="密碼"
            rules="required|min:6|max:12"
            v-slot="validationContext"
          >
            <b-form-group
              id="input-group-2"
              label=""
              label-for="input-2"
            >
              <b-form-input
                v-model="user.password"
                :state="getValidationState(validationContext)"
                id="input-2"
                required
                placeholder="請輸入密碼"
              ></b-form-input>
              <b-form-invalid-feedback id="input-1-live-feedback">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <b-button
            type="submit"
            variant="primary"
            size="sm"
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
export default {
  data() {
    return {
      user: {
        username: "",
        password: ""
      },
      form: {
        email: "",
        name: "",
        food: null,
        checked: []
      },
      show: true
    }
  },
  methods: {
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    },
    signIn() {
      const api = `${process.env.VUE_APP_APIPATH}/admin/signin`
      this.axios.post(api, this.user).then(response => {
        console.log(response.data)
        if (response.data.success) {
          this.$router.push("/admin/products")
        }
      })
    }
  }
}
</script>

<style lang="scss">
.views-the_login {
  height: auto;
  max-width: 20rem;
  margin: 0 auto;
  .card {
    margin-top: 30%;
  }
}
</style>

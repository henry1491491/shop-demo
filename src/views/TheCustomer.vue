<template>
  <div class="views-thecustomer">
    <b-container>

      <the-customer-navbar />

      <hr class="m-1">

      <b-row
        v-if="$route.path === '/' || $route.path === '/favor'"
        class="mt-3"
      >
        <b-col
          cols="12"
          sm="12"
          md="2"
        >
          <the-customer-sidebar />

        </b-col>
        <b-col
          cols="12"
          sm="12"
          md="10"
        >
          <b-row>
            <b-col
              v-for="(i,key) in 12"
              v-show="isLoading"
              :key="key"
              cols="4"
              sm="3"
              lg="2"
            >
              <v-skeleton-loader
                max-height="300"
                type="card,list-item"
              />
            </b-col>
          </b-row>

          <router-view />

        </b-col>
      </b-row>

      <div v-else-if="$route.name === 'TheCustomerContentProductDetail'">
        <the-customer-content-product-detail />
      </div>

      <div v-else>
        <router-view />
      </div>

      <hr>

      <the-customer-footer />
    </b-container>
  </div>
</template>

<script>
import TheCustomerNavbar from "../views/TheCustomerNavbar"
import TheCustomerNavbarTabs from "../views/TheCustomerNavbarTabs"
import TheCustomerSidebar from "../views/TheCustomerSidebar"
import TheCustomerContent from "../views/TheCustomerContent"
import TheCustomerContentProductDetail from "../views/TheCustomerContentProductDetail"
import TheCustomerFooter from "../views/TheCustomerFooter"
import TheCustomerShoppingCartContent from "../views/TheCustomerShoppingCartContent"
import TheCustomerShoppingCartForm from "../views/TheCustomerShoppingCartForm"

export default {
  name: "TheCustomer",
  components: {
    TheCustomerNavbar,
    TheCustomerNavbarTabs,
    TheCustomerSidebar,
    TheCustomerContent,
    TheCustomerContentProductDetail,
    TheCustomerFooter,
    TheCustomerShoppingCartContent,
    TheCustomerShoppingCartForm
  },
  data() {
    return {
      fullPage: true
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
    this.$store.dispatch("customer/getProductsAll")
  }
}
</script>


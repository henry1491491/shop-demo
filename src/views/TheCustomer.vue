<template>
  <div class="views-thecustomer">
    <loading
      :active.sync="isLoading"
      :is-full-page="fullPage"
    />
    <b-container>
      <the-customer-navbar />

      <hr class="m-1">

      <b-alert-default />
      <the-customer-navbar-tabs />

      <hr class="m-1">

      <router-view />

      <b-row
        v-show="this.$route.name === 'TheCustomer'"
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
          <the-customer-content />
        </b-col>
      </b-row>

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
import TheCustomerContentFavor from "../views/TheCustomerContentFavor"
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
    TheCustomerContentFavor,
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


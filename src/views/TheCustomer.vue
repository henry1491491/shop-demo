<template>
  <div class="views-thecustomer">
    <the-customer-navbar />
    <hr class="m-1">
    <base-carousel
      v-show="$route.path === '/'"
      :items="carouselItems"
    >
      <h1>123</h1>
    </base-carousel>
    <b-container>

      <router-view :key="$route.path" />

    </b-container>
    <hr>
    <the-customer-footer />
  </div>
</template>

<script>
import TheCustomerNavbar from "../views/TheCustomerNavbar"
import TheCustomerFooter from "../views/TheCustomerFooter"

export default {
  name: "TheCustomer",
  components: {
    TheCustomerNavbar,
    TheCustomerFooter
  },
  data() {
    return {
      carouselItems: [
        {
          actived: false,
          position: -616,
          url:
            "https://images.unsplash.com/photo-1556473062-062e556b0920?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
        },
        {
          actived: true,
          position: 0,
          url:
            "https://images.unsplash.com/photo-1514092379092-21dfee9d0b93?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80"
        },
        {
          actived: false,
          position: 616,
          url:
            "https://images.unsplash.com/photo-1511663205848-84f259a259b4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
        },
        {
          actived: false,
          position: 1232,
          url:
            "https://images.unsplash.com/photo-1569218483465-1402d1ded646?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
        },
        {
          actived: false,
          position: 1848,
          url:
            "https://images.unsplash.com/photo-1573663257502-eae7633f2e4f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=920&q=80"
        },
        {
          actived: false,
          position: 2464,
          url:
            "https://images.unsplash.com/photo-1531501151912-4acaa27dec3c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
        },
        {
          actived: false,
          position: 3080,
          url:
            "https://images.unsplash.com/photo-1525977261834-e0832db2e7e1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
        }
      ]
    }
  },
  mounted() {
    this.$store.dispatch("customer/getProductsAll")
  }
}
</script>


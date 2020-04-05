<template>
  <div id="views-thecustomer">
    <the-customer-navbar />
    <hr class="m-1">
    <base-carousel
      v-show="$route.path === '/'"
      :auto-play="carouselAutoPlay"
      :items="carouselItems"
    />
    <b-container>
      <router-view :key="$route.path" />
    </b-container>
    <hr>
    <the-customer-footer />
  </div>
</template>

<script>
import BaseCarousel from '../components/BaseCarousel'
import TheCustomerNavbar from '../views/TheCustomerNavbar'
import TheCustomerFooter from '../views/TheCustomerFooter'

export default {
  name: 'TheCustomer',
  components: {
    BaseCarousel,
    TheCustomerNavbar,
    TheCustomerFooter
  },
  data () {
    return {
      carouselItems: [
        {
          actived: false,
          content: {
            header: { text: '4/1 - 4/15 蘭園開放參觀', class: ['text-right', 'text-danger'] },
            main: { text: '門票：大人 150，兒童免費', class: ['mt-2', 'text-danger', 'h5', 'text-right'] },
            button: [{
              text: '立即索取',
              class: ['ml-auto'],
              variant: 'danger',
              url: ''
            }]
          },
          position: -616,
          url:
            'https://images.unsplash.com/photo-1489919282651-df73812beffb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
        },
        {
          actived: true,
          content: {
            main: { text: '幽蘭生前庭，含熏待清風。清風脫然至，見別蕭艾中。', class: ['text-center', 'h5', 'text-light', 'mt-3'] }
          },
          position: 0,
          url:
            'https://images.unsplash.com/photo-1514092379092-21dfee9d0b93?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80'
        },
        {
          actived: false,
          content: {
            header: { text: '原生之美', class: ['text-center', 'text-primary'] },
            main: { text: '各色原生蘭瓶苗販售中，稀有品種少量釋出', class: ['text-primary', 'text-center', 'h5'] }
          },
          position: 616,
          url:
            'https://images.unsplash.com/photo-1542407242725-7d7f3d865665?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
        },
        {
          actived: false,
          content: {
            header: { text: '新手種植套件組', class: ['text-gray', 'text-right'] },
            main: { text: '附盆器、水草、肥料，讓種植一次到位', class: ['text-gray', 'text-right', 'h5'] },
            button: [{
              text: '點擊索取',
              class: ['ml-auto'],
              variant: 'gray',
              url: ''
            }]
          },
          position: 1232,
          url:
            'https://images.unsplash.com/photo-1536505935294-3acc42ccd0b2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
        }

      ],
      carouselAutoPlay: true
    }
  },
  mounted () {
    this.$store.dispatch('customer/getProductsAll')
  }
}
</script>

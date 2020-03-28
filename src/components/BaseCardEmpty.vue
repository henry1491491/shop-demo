 <template>
  <div id="components-base_cardempty">
    <b-card>
      <v-svg-cart class="text-center mr-5 mt-5" />
      <b-card-text class="text-center mt-4">
        {{cardText}}
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
import VSvgCart from "./VSvgCart"
export default {
  name: "BaseCardEmpty",
  components: {
    VSvgCart
  },
  props: {
    cardText: { type: String }
  }
}
</script>

<style lang="scss">
#components-base_cardempty {
  .card {
    height: 425px;
  }
  .card-text {
    font-size: 1.2rem !important;
  }
}
</style>

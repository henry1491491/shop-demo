<template>
  <div id="components-base_cardempty">
    <v-svg-cart class="text-center mr-5 mt-5" />
    <b-card-text class="text-center mt-4">
      {{ cardText }}
    </b-card-text>
    <b-card-text class="text-center">
      <slot name="action" />
    </b-card-text>
  </div>
</template>

<script>
import VSvgCart from './VSvgCart'
export default {
  name: 'BaseCardEmpty',
  components: {
    VSvgCart
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    cardText: { type: String }
  }
}
</script>

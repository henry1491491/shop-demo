<template>
  <div
    id="components-base_paginationproducts"
    class="mt-3"
  >
    <b-pagination
      v-model="propCurrentPage"
      :total-rows="rows"
      pills
      @input="input"
      @change="change"
    />
  </div>
</template>

<script>
export default {
  name: 'BasePaginationProducts',
  props: {
    rows: { type: Number, default: 1 },
    perPage: { type: Number, default: 12 },
    currentPage: { type: Number, default: 1 }
  },
  data () {
    return {
      propCurrentPage: this.currentPage
    }
  },
  methods: {
    input (e) {
      this.$emit('get-current-page', e)
    },
    change (e) {}
  }
}
</script>

<style lang="scss">
#components-base_paginationproducts {
  .b-pagination-pills,
  .page-item,
  .page-link {
    border-radius: 4px !important;
  }
}
</style>

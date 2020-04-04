<template>
  <div id="components-base_sidebar">
    <div class="mb-2">
      <b>依種類搜尋</b>
    </div>

    <b-list-group>
      <b-list-group-item
        v-for="item in categories"
        :key="item"
        :class="{active:sortTitle === item }"
        button
        class="p-1"
        @click="filterHandler({type:'category',value:item})"
      >
        <span class="ml-2">{{ item }}</span>
      </b-list-group-item>
    </b-list-group>

    <hr>

    <div class="mb-2">
      <b>依價格搜尋</b>
    </div>

    <b-list-group>
      <b-list-group-item>
        <b-form-group>
          <b-form-radio
            v-for="item in priceRadiosOptions"
            :key="item.value"
            v-model="propsPriceRadiosSelected"
            :value="item.value"
            class="m-0 pl-3"
            name="some-radios"
            @change="filterHandler({type:'price',low:item.low,high:item.high})"
          >
            {{ item.text }}
          </b-form-radio>
        </b-form-group>
      </b-list-group-item>
    </b-list-group>

    <b-button
      block
      class="text-left pl-0 text-danger d-flex justify-content-start align-items-center"
      variant="link"
      @click="removeConditions"
    >
      <close />
      <span>清除篩選</span>
    </b-button>
  </div>
</template>

<script>
export default {
  name: 'BaseSidebar',
  data () {
    return {
      propsPriceRadiosSelected: this.priceRadiosSelected
    }
  },
  props: {
    categories: {
      type: Array,
      default: () => {
        return this.$store.state.customer.categories
      }
    },
    priceRadiosOptions: {
      type: Array,
      default: () => {
        return [
          { text: 'NT$300 以下', value: '1', low: 0, high: 300 },
          { text: 'NT$300-500', value: '2', low: 300, high: 500 },
          { text: 'NT$500-1000', value: '3', low: 500, high: 1000 },
          { text: 'NT$1000-2000', value: '4', low: 1000, high: 2000 },
          { text: 'NT$2000-2500', value: '5', low: 2000, high: 2500 },
          { text: 'NT$2500-5000', value: '6', low: 2500, high: 5000 },
          { text: 'NT$5000 以上', value: '7', low: 5000, high: 1000000 }
        ]
      }
    },
    priceRadiosSelected: { type: String, default: '1' },
    sortTitle: { type: String, default: '全部' }
  },
  methods: {
    filterHandler (item) {
      this.$emit('filter-handler', item)
    },
    removeConditions () {
      this.$emit('remove-conditions')
    }
  }
}
</script>

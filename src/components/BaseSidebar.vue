<template>
  <div>
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
        <span class="ml-2">{{item}}</span>
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
            {{item.text}}
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
  name: "BaseSidebar",
  data() {
    return {
      propsPriceRadiosSelected: this.priceRadiosSelected
    }
  },
  props: {
    categories: { type: Array },
    priceRadiosOptions: { type: Array },
    priceRadiosSelected: { type: String },
    sortTitle: { type: String }
  },
  methods: {
    filterHandler(item) {
      this.$emit("filter-handler", item)
    },
    removeConditions() {
      this.$emit("remove-conditions")
    }
  }
}
</script>

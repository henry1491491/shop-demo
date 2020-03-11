<template>
  <div id="components-basecard_products">
    <b-card
      :img-src="item.imageUrl"
      :img-alt="item.title"
      class="base-card m-1 pt-0"
      img-top
      no-body
      tag="article"
    >
      <heart
        v-if="favorList.indexOf(item.title) !== -1"
        class="base-card-favor-icon text-danger"
        @click="setFavorTitle(item)"
      />
      <heart-outline
        v-if="favorList.indexOf(item.title) === -1"
        class="base-card-favor-icon text-danger"
        @click="setFavorTitle(item)"
      />

      <b-card-body class="p-2">
        <b-card-title>
          <b-link
            class="base-card-text-title text-secondary h5"
            variant="link"
            @click.stop="getProduct(item.id)"
          >
            {{item.title}}
          </b-link>
        </b-card-title>

        <b-card-text class="base-card-text-details text-truncate mb-1">
          {{item.description}}
        </b-card-text>

        <b-card-text class="d-flex justify-content-start align-items-center">
          <span class="base-card-text-price m-1">
            NT {{ item.price | currency }}
          </span>

          <del
            v-show="item.price !== item.origin_price"
            class="base-card-text-price-del text-muted m-1"
          >
            NT {{ item.origin_price | currency }}
          </del>
        </b-card-text>
      </b-card-body>

      <div class="base-card-btn d-flex justify-content-between m-0 p-1">
        <a
          href="#"
          class="card-link"
        >
          <b-spinner
            v-if="status.loadingItem === item.id"
            label="Spinning"
            small
            variant="danger"
          />
          <cart-outline-icon
            v-if="status.loadingItem !== item.id"
            class="text-danger"
            @click.stop="addToCart(item.id)"
          />
        </a>
        <b-button
          class="ml-auto"
          size="sm"
          variant="danger"
          @click="goToShoppingCart(item.id)"
        >
          直接購買
        </b-button>
      </div>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "BaseCardProducts",
  props: {
    item: { type: Object },
    favorList: { type: Array },
    status: { type: Object }
  },
  methods: {
    setFavorTitle(item) {
      this.$emit("set-favor-title", item)
    },
    getProduct(id) {
      this.$emit("get-product", id)
    },
    async addToCart(id) {
      this.$emit("add-to-cart", id)
      return true
    },
    async goToShoppingCart(id) {
      let result = await this.addToCart(id)
      if (result) {
        this.$emit("go-to-shopping-cart")
      }
    }
  }
}
</script>





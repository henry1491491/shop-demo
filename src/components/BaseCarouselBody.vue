<template>
  <div
    v-if="item.content"
    id="components-base_carousel_body"
    class="d-flex flex-column"
  >
    <h1
      v-if="item.content.header"
      :class="item.content.header.class"
    >
      {{ item.content.header.text }}
    </h1>

    <p
      v-if="item.content.main"
      :class="item.content.main.class"
    >
      {{ item.content.main.text }}
    </p>

    <div
      v-if="item.content.button"
      :class="item.content.button[0].class"
    >
      <b-button :variant="item.content.button[0].variant">
        {{ item.content.button[0].text }}
      </b-button>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'BaseCarouselBody',
  props: {
    item: { type: Object }
  }
}
</script>

<style lang="scss">
#components-base_carousel_body{
  background-color: rgba(0,0,0,0.1);
  border-radius:4px;
  padding:1rem;
  height:100%;
}
</style>
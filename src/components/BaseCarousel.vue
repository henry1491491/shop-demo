<template>
  <div id="components-base_carousel">
    <div class="carousel-container">
      <div class="carousel-item-left"></div>
      <div class="carousel-item-middle">
        <ul>
          <li
            v-for="(item,key) in showItems"
            :key="key"
            :style="item.imgStyle"
            class="item"
          >
            <img :src="item.imgUrl">
            <div class="img-content">
              <slot></slot>
            </div>
          </li>
        </ul>
      </div>
      <div class="carousel-item-right"></div>
      <div class="prev-btn">
        <a
          href="#"
          v-on:click="goPrev(1)"
        >&#10094;</a>
      </div>
      <div class="next-btn">
        <a
          href="#"
          v-on:click="goNext(1)"
        >&#10095;</a>
      </div>
    </div>
    <div class="counter-group">
      <span
        v-for="(item,key) in items"
        :key="key"
        :class="[item.position === 0 ? 'active' :'']"
        class="dot"
      ></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseCarousel",
  props: {
    items: { type: Array }
  },
  data() {
    return {
      endPosition: 3080,
      autoPlay: true,
      currentSlider: 1,
      propsItems: this.items
    }
  },
  computed: {
    showItems: {
      get() {
        return this.propsItems.map((el, key) => {
          if (el.position === 0) {
            return {
              id: key,
              imgStyle: `transform:translate3d(${this.propsItems[key].position}px, 0px, 0px);transition: transform 1s;opacity:1`,
              imgUrl: this.propsItems[key].url
            }
          } else if (el.position === -166 || el.position === 616) {
            return {
              id: key,
              imgStyle: `transform:translate3d(${this.propsItems[key].position}px, 0px, 0px);transition: transform .2s;z-index:0`,
              imgUrl: this.propsItems[key].url
            }
          } else {
            return {
              id: key,
              imgStyle: `transform:translate3d(${this.propsItems[key].position}px, 0px, 0px);transition: all ease 1s`,
              imgUrl: this.propsItems[key].url
            }
          }
        })
      },
      set(val) {
        this.showItems = val
      }
    }
  },
  methods: {
    goNext() {
      this.propsItems = this.propsItems.map(el => {
        if (el.position === -616) {
          el.position = this.endPosition
          return el
        } else {
          el.position = el.position - 616
          return el
        }
      })
    },
    goPrev() {
      this.propsItems = this.propsItems.map(el => {
        if (el.position === this.endPosition) {
          el.position = -616
          return el
        } else {
          el.position = el.position + 616
          return el
        }
      })
    }
  }
}
</script>




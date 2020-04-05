<template>
  <div id="components-base_carousel">
    <div class="carousel-container">
      <div class="carousel-item-left" />
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
              <base-carousel-body :item="item" />
            </div>
          </li>
        </ul>
      </div>
      <div class="carousel-item-right" />
      <div
        class="prev-btn"
        @click="goPrev(1)"
      >
        <a
          href="#"
        >&#10094;</a>
      </div>
      <div
        class="next-btn"
        @click="goNext(1)"
      >
        <a
          href="#"
        >&#10095;</a>
      </div>
    </div>
    <div class="counter-group">
      <span
        v-for="(item,key) in items"
        :key="key"
        :class="[item.position === 0 ? 'active' :'']"
        class="dot"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseCarousel',
  props: {
    autoPlay: { type: Boolean, default: true },
    interval: { type: Number || String, default: 5000 },
    // eslint-disable-next-line vue/require-default-prop
    items: { type: Array }

  },
  data () {
    return {
      endPosition: 1232,
      currentSlider: 1,
      propsItems: this.items
    }
  },
  computed: {
    showItems () {
      return this.propsItems.map((el, key) => {
        if (el.position === 0) {
          return {
            content: el.content,
            id: key,
            imgStyle: `transform:translate3d(${this.propsItems[key].position}px, 0px, 0px);transition:transform 1s;opacity:1`,
            imgUrl: this.propsItems[key].url
          }
        } else if (el.position === -616 || el.position === 616) {
          return {
            content: el.content,
            id: key,
            imgStyle: `transform:translate3d(${this.propsItems[key].position}px, 0px, 0px);transition: all ease 1s`,
            imgUrl: this.propsItems[key].url
          }
        } else {
          return {
            content: el.content,
            id: key,
            imgStyle: `transform:translate3d(${this.propsItems[key].position}px, 0px, 0px);opacity:.2;z-index:-10;transition: all ease 1s`,
            imgUrl: this.propsItems[key].url
          }
        }
      })
    }
  },
  created () {
    this.playCarousel(this.interval)
  },
  methods: {
    goNext () {
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
    goPrev () {
      this.propsItems = this.propsItems.map(el => {
        if (el.position === this.endPosition) {
          el.position = -616
          return el
        } else {
          el.position = el.position + 616
          return el
        }
      })
    },
    playCarousel (interval) {
      if (this.autoPlay) {
        window.setInterval(() => {
          this.goNext()
        }, interval)
      } else {

      }
    }
  }
}
</script>

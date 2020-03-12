<template>
  <div>
    <b-alert
      v-for="(item, i) in messages"
      :key="i"
      :variant="item.variant"
      class="d-flex justify-content-center"
      dismissible
      fade
      show
    >
      <span class="text-center">{{item.msg}}</span>
    </b-alert>
  </div>
</template>

<script>
export default {
  name: "BaseAlert",
  data() {
    return {}
  },
  computed: {
    messages() {
      return this.$store.state.alert.messages
    }
  },
  methods: {}
}
</script>


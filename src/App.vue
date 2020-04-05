<template>
  <div id="app">
    <base-alert />
    <router-view />
  </div>
</template>

<script>
import BaseAlert from './components/BaseAlert'

export default {
  name: 'App',
  components: { BaseAlert }
}
</script>

<style lang="scss">
@import "src/assets/css/main.scss";
</style>

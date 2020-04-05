import Vue from 'vue'

Vue.prototype._$alert = (msg, variant = 'primary', duration = 2000) => {
  return {
    msg,
    duration,
    id: Math.floor(new Date() / 1000),
    variant
  }
}

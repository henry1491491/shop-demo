<template>
  <div id="views-thecustomer_navbar">
    <b-navbar
      toggleable="lg"
      type="light"
      variant="fade"
    >
      <b-button
        :href="navbarHref"
        class="d-flex align-items-center justify-content-center"
        variant="link"
      >
        <img
          alt="orchids"
          class="d-inline-block align-top mr-2"
          height="40px"
          src="https://image.flaticon.com/icons/svg/898/898143.svg"
          width="40px"
        >
        <span class="nav-title">{{navbarTitle}}</span>
      </b-button>

      <slot></slot>

    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "BaseNavbar",
  props: {
    navbarTitle: { type: String },
    navbarHref: { type: String }
  }
}
</script>

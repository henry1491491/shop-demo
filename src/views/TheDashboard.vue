<template>
  <div id="views-thedashboard">
    <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <a
        class="navbar-brand col-sm-3 col-md-2 mr-0"
        href="#"
      >
        Orchids 蘭園管理後台
      </a>
      <input
        class="form-control form-control-dark w-100"
        type="text"
        placeholder="Search"
        aria-label="Search"
      >
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a
            class="nav-link"
            href="#"
            @click.prevent="signOut"
          >
            登出
          </a>
        </li>
      </ul>
    </nav>

    <div class="container-fluid">
      <div class="row">
        <nav class="col-md-2 d-none d-md-block bg-light sidebar">
          <div class="sidebar-sticky">
            <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
              <span>管理員</span>
              <a
                class="d-flex align-items-center text-muted"
                href="#"
                aria-label="Add a new report"
              >
                <span data-feather="plus-circle"></span>
              </a>
            </h6>
            <ul class="nav flex-column">
              <li class="nav-item">
                <router-link
                  to="/admin/products"
                  class="nav-link d-flex align-items-center"
                >
                  <flower-icon class="mr-1" />
                  <span>產品列表</span>
                </router-link>
              </li>

              <li class="nav-item">
                <router-link
                  to="/admin/orders"
                  class="nav-link d-flex align-items-center"
                >
                  <flower-icon class="mr-1" />
                  <span>訂單列表</span>
                </router-link>
              </li>

              <li class="nav-item">
                <router-link
                  to="/admin/coupons"
                  class="nav-link d-flex align-items-center"
                >
                  <flower-icon class="mr-1" />
                  <span>優惠券</span>
                </router-link>
              </li>
            </ul>

            <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
              <span>模擬功能</span>
              <a
                class="d-flex align-items-center text-muted"
                href="#"
                aria-label="Add a new report"
              >
                <span data-feather="plus-circle"></span>
              </a>
            </h6>
            <ul class="nav flex-column mb-2">
              <li class="nav-item">
                <router-link
                  to="/"
                  class="nav-link d-flex align-items-center"
                >
                  <clipboard-list-outline-icon class="mr-1" />
                  <span>模擬訂單</span>
                </router-link>
              </li>
            </ul>
          </div>
        </nav>

        <main
          role="main"
          class="col-md-9 ml-sm-auto col-lg-10 px-4"
        >
          <router-view />
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import { apiLogLogout } from "../plugins/axios"

export default {
  name: "TheDashboard",
  data() {
    return {
      fullPage: true
    }
  },
  methods: {
    signOut() {
      apiLogLogout().then(response => {
        if (!response.data.success) return
        this.$router.push("/login")
      })
    }
  }
}
</script>


<template>
  <div class="views-the_dashboard">
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
                  to="/customer_order"
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
export default {
  name: "TheDashboard",
  data() {
    return {}
  },
  methods: {
    signOut() {
      const api = `${process.env.VUE_APP_APIPATH}/logout`
      this.axios.post(api, this.user).then(response => {
        if (response.data.success) {
          this.$router.push("/login")
        }
      })
    }
  }
}
</script>

<style lang="scss">
.views-the_dashboard {
  body {
    font-size: 0.875rem;
  }

  .feather {
    width: 16px;
    height: 16px;
    vertical-align: text-bottom;
  }

  /*
 * Sidebar
 */

  .sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 100; /* Behind the navbar */
    padding: 48px 0 0; /* Height of navbar */
    box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.1);
  }

  .sidebar-sticky {
    position: relative;
    top: 0;
    height: calc(100vh - 48px);
    padding-top: 0.5rem;
    overflow-x: hidden;
    overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
  }

  @supports ((position: -webkit-sticky) or (position: sticky)) {
    .sidebar-sticky {
      position: -webkit-sticky;
      position: sticky;
    }
  }

  .sidebar .nav-link {
    font-weight: 500;
    color: #333;
  }

  .sidebar .nav-link .feather {
    margin-right: 4px;
    color: #999;
  }

  .sidebar .nav-link.active {
    color: #007bff;
  }

  .sidebar .nav-link:hover .feather,
  .sidebar .nav-link.active .feather {
    color: inherit;
  }

  .sidebar-heading {
    font-size: 0.75rem;
    text-transform: uppercase;
  }

  /*
 * Content
 */

  [role="main"] {
    padding-top: 133px; /* Space for fixed navbar */
  }

  @media (min-width: 768px) {
    [role="main"] {
      padding-top: 48px; /* Space for fixed navbar */
    }
  }

  /*
 * Navbar
 */

  .navbar-brand {
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    font-size: 1rem;
    background-color: rgba(0, 0, 0, 0.25);
    box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.25);
  }

  .navbar .form-control {
    padding: 0.75rem 1rem;
    border-width: 0;
    border-radius: 0;
  }

  .form-control-dark {
    color: #fff;
    background-color: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.1);
  }

  .form-control-dark:focus {
    border-color: transparent;
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.25);
  }
}
</style>

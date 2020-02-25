<template>
  <nav aria-label="Page navigation example">
    <ul
      class="pagination pagination-sm"
      :class="justify"
    >
      <li
        :class="{'disable':!pagination.has_pre}"
        class="page-item"
      >
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click.prevent="paginationHandler(pagination.current_page - 1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        v-for="page in pagination.total_pages"
        :class="{'active':pagination.current_page === page}"
        :key="page"
        class="page-item"
      ><a
          class="page-link"
          href="#"
          @click.prevent="paginationHandler(page)"
        >
          {{page}}
        </a>
      </li>
      <li
        :class="{'disable':!pagination.has_next}"
        class="page-item"
      >
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click.prevent="paginationHandler(pagination.current_page + 1)"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "BPaginationDefault",
  props: {
    pagination: Object,
    justify: String
  },
  data() {
    return {}
  },
  methods: {
    paginationHandler(page) {
      this.$emit("paginate", page)
    }
  }
}
</script>

<template>
  <b-container
    fluid
    class="views-the_dashboard_products"
  >
    <b-button
      id="show-edit-product"
      class="m-3 float-right"
      @click="showEditProduct(true)"
    >
      建立商品
    </b-button>

    <b-modal
      ref="edit-product-modal"
      size="lg"
      title="BootstrapVue"
    >
      <b-row>
        <b-col cols="3">
          <b-form-group
            id="input-group-1"
            label="輸入圖片網址"
            label-for="input-1"
            description=""
          >
            <b-form-input
              v-model="tempProduct.imageUrl"
              id="input-1"
              size="sm"
              type="text"
              placeholder="請輸入圖片連結"
            ></b-form-input>
          </b-form-group>

          <b-form-file
            v-model="file"
            class="mt-3"
            ref="file-input"
            plain
            @change="uploadFile"
          >
          </b-form-file>
          <b-img
            :src="tempProduct.imageUrl"
            :alt="tempProduct.title"
            class="mt-1"
            thumbnail
            fluid
          ></b-img>

        </b-col>
        <b-col cols="9">
          <b-form-group
            id="input-group-2"
            label="標題"
            label-for="input-2"
            description=""
          >
            <b-form-input
              id="input-2"
              v-model="tempProduct.title"
              size="sm"
              type="text"
              placeholder="請輸入標題"
            />
          </b-form-group>

          <b-row>
            <b-col>
              <b-form-group
                id="input-group-3"
                label="分類"
                label-for="input-3"
                description=""
              >
                <b-form-input
                  id="input-3"
                  v-model="tempProduct.category"
                  size="sm"
                  type="text"
                  placeholder="請輸入分類"
                />
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                id="input-group-4"
                label="單位"
                label-for="input-4"
                description=""
              >
                <b-form-input
                  id="input-4"
                  v-model="tempProduct.unit"
                  size="sm"
                  type="text"
                  placeholder="請輸入單位"
                />
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col>
              <b-form-group
                id="input-group-5"
                label="原價"
                label-for="input-5"
                description=""
              >
                <b-form-input
                  id="input-5"
                  v-model="tempProduct.origin_price"
                  size="sm"
                  type="number"
                  placeholder="請輸入原價"
                />
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                id="input-group-6"
                label="售價"
                label-for="input-6"
                description=""
              >
                <b-form-input
                  id="input-6"
                  v-model="tempProduct.price"
                  size="sm"
                  type="number"
                  placeholder="請輸入售價"
                />
              </b-form-group>
            </b-col>
          </b-row>

          <b-form-group
            class="b-form-group-textarea"
            label="商品描述"
          >
            <b-form-textarea
              v-model="tempProduct.description"
              id="textarea1"
              size="sm"
              placeholder="請輸入商品描述"
              rows="2"
            >
            </b-form-textarea>
          </b-form-group>
          <b-form-group label="說明內容">
            <b-form-textarea
              v-model="tempProduct.content"
              id="textarea2"
              size="sm"
              placeholder="請輸入說明內容"
              rows="2"
            ></b-form-textarea>
          </b-form-group>
          <b-form-checkbox
            id="checkbox-1"
            v-model="tempProduct.is_enabled"
            name="checkbox-1"
            value="1"
            unchecked-value="0"
          >
            是否啟用？
          </b-form-checkbox>
        </b-col>
      </b-row>
      <template v-slot:modal-footer>
        <div class="w-100">
          <b-button
            variant="primary"
            size="md"
            class="float-right"
            @click="updateProduct"
          >
            確認
          </b-button>
          <b-button
            variant="danger"
            size="md"
            class="mr-1 float-right"
            @click="cancerEditProduct"
          >
            取消
          </b-button>
        </div>
      </template>
    </b-modal>

    <content-loader-table
      :loading.sync="loading"
      :width="contentLoaderOptions.width"
      :height="contentLoaderOptions.height"
      :speed="contentLoaderOptions.speed"
    />

    <b-table
      v-if="!loading"
      :items="products"
      :fields="fields"
      responsive
      small
      striped
      stacked="md"
    >
      <template v-slot:cell(origin_price)="data">
        {{ data.item.origin_price | currency  }}
      </template>

      <template v-slot:cell(price)="data">
        {{ data.item.price | currency  }}
      </template>

      <template v-slot:cell(is_enabled)="data">
        <p
          v-show="data.item.is_enabled"
          class="text-success"
        >
          是
        </p>
        <p
          v-show="!data.item.is_enabled"
          class="text-danger"
        >
          否
        </p>
      </template>

      <template v-slot:cell(actions)="row">
        <b-button
          size="sm"
          class="mr-1"
          @click="showEditProduct(false,row.item)"
        >
          編輯
        </b-button>
        <b-button
          size="sm"
          class="mr-1"
          @click="deleteProduct(row.item)"
        >
          刪除
        </b-button>
      </template>
    </b-table>

    <b-pagination-default
      :pagination="pagination"
      v-on:paginate="getProducts"
    />

  </b-container>
</template>

<script>
export default {
  name: "TheDashboardProducts",
  data() {
    return {
      contentLoaderOptions: {
        width: 850,
        height: 430,
        speed: 2
      },
      loading: false,
      tempProduct: {
        title: "",
        category: "",
        origin_price: null,
        price: null,
        unit: "",
        image: "",
        description: "",
        content: "",
        is_enabled: 1,
        imageUrl: ""
      },
      isNew: false,
      file: null,
      products: [],
      pagination: {},
      fields: [
        {
          key: "category",
          label: "分類"
        },
        {
          key: "title",
          label: "名稱"
        },
        {
          key: "origin_price",
          label: "原價"
        },
        { key: "price", label: "售價" },
        {
          key: "is_enabled",
          label: "是否啟用"
        },
        { key: "actions", label: "編輯" }
      ]
    }
  },

  mounted() {
    this.getProducts()
  },
  methods: {
    showEditProduct(isNew, item) {
      if (isNew) {
        this.tempProduct = {}
        this.isNew = true
      } else {
        this.tempProduct = Object.assign({}, item)
        this.isNew = false
      }
      this.$refs["edit-product-modal"].show()
    },
    cancerEditProduct() {
      this.$refs["edit-product-modal"].hide()
    },
    deleteProduct(item) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${item.id}`
      this.axios.delete(api).then(response => {
        this.getProducts()
      })
    },
    updateProduct() {
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product`
      let httpMethod = "post"
      if (!this.isNew) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${this.tempProduct.id}`
        httpMethod = "put"
      }
      this.axios[httpMethod](api, { data: this.tempProduct }).then(response => {
        if (response.data.success) {
          this.$refs["edit-product-modal"].hide()
          this.getProducts()
        } else {
          this.$refs["edit-product-modal"].hide()
          this.getProducts()
          console.log("新增失敗")
        }
      })
    },
    uploadFile() {
      console.log(this.$refs["file-input"].$refs.input.files[0])
      const uploadedFile = this.$refs["file-input"].$refs.input.files[0]
      const formData = new FormData()
      formData.append("file-to-upload", uploadedFile)
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/upload`
      this.axios
        .post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(response => {
          if (response.data.success) {
            this.$set(this.tempProduct, "imageUrl", response.data.imageUrl)
          }
        })
    },
    getProducts(page = 1) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/products?page=${page}`
      this.loading = true
      this.axios.get(api).then(response => {
        this.loading = false
        this.products = response.data.products
        this.pagination = response.data.pagination
      })
    }
  }
}
</script>

<style lang="scss">
.views-the_dashboard_products {
  .b-form-group-textarea {
    height: 20px !important;
  }
}
</style>

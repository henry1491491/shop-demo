<template>
  <b-container
    fluid
    id="views-thedashboard_products"
  >
    <b-button
      id="show-edit-product"
      v-if="!isLoading"
      class="m-3 float-right"
      @click="showEditProduct(true)"
    >
      建立商品
    </b-button>

    <b-modal
      ref="edit-product-modal"
      size="lg"
      title="新增 / 編輯商品"
    >
      <b-row>
        <b-col cols="3">
          <b-form-group
            id="input-group-1"
            label="輸入圖片網址"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="tempProduct.imageUrl"
              placeholder="請輸入圖片連結"
              size="sm"
              type="text"
            />
          </b-form-group>

          <b-form-file
            ref="file-input"
            v-model="file"
            class="mt-3"
            plain
            @change="uploadFile"
          />
          <b-img
            :src="tempProduct.imageUrl"
            :alt="tempProduct.title"
            class="mt-1"
            fluid
            thumbnail
          />
        </b-col>
        <b-col cols="9">
          <b-form-group
            id="input-group-2"
            label="標題"
            label-for="input-2"
          >
            <b-form-input
              id="input-2"
              v-model="tempProduct.title"
              placeholder="請輸入標題"
              size="sm"
              type="text"
            />
          </b-form-group>

          <b-row>
            <b-col>
              <b-form-group
                id="input-group-3"
                label="分類"
                label-for="input-3"
              >
                <b-form-input
                  id="input-3"
                  v-model="tempProduct.category"
                  placeholder="請輸入分類"
                  size="sm"
                  type="text"
                />
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                id="input-group-4"
                label="單位"
                label-for="input-4"
              >
                <b-form-input
                  id="input-4"
                  v-model="tempProduct.unit"
                  placeholder="請輸入單位"
                  size="sm"
                  type="text"
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
              >
                <b-form-input
                  id="input-5"
                  v-model="tempProduct.origin_price"
                  placeholder="請輸入原價"
                  size="sm"
                  type="number"
                />
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                id="input-group-6"
                label="售價"
                label-for="input-6"
              >
                <b-form-input
                  id="input-6"
                  v-model="tempProduct.price"
                  placeholder="請輸入售價"
                  size="sm"
                  type="number"
                />
              </b-form-group>
            </b-col>
          </b-row>

          <b-form-group
            class="b-form-group-textarea"
            label="商品描述"
          >
            <b-form-textarea
              id="textarea1"
              v-model="tempProduct.description"
              placeholder="請輸入商品描述"
              rows="2"
              size="sm"
            />
          </b-form-group>
          <b-form-group label="說明內容">
            <b-form-textarea
              id="textarea2"
              v-model="tempProduct.content"
              placeholder="請輸入說明內容"
              rows="2"
              size="sm"
            />
          </b-form-group>
          <b-form-checkbox
            id="checkbox-1"
            v-model="tempProduct.is_enabled"
            name="checkbox-1"
            unchecked-value="0"
            value="1"
          >
            是否啟用？
          </b-form-checkbox>
        </b-col>
      </b-row>
      <template v-slot:modal-footer>
        <div class="w-100">
          <b-button
            class="float-right"
            size="md"
            variant="primary"
            @click="updateProduct"
          >
            確認
          </b-button>
          <b-button
            class="mr-1 float-right"
            size="md"
            variant="danger"
            @click="cancerEditProduct"
          >
            取消
          </b-button>
        </div>
      </template>
    </b-modal>

    <v-skeleton-loader
      v-if="isLoading"
      class="mt-5"
      type="table"
    />

    <b-table
      v-if="!isLoading"
      :items="products"
      :fields="fields"
      responsive
      small
      stacked="md"
      striped
    >
      <template v-slot:cell(origin_price)="data">
        {{ data.item.origin_price | currency }}
      </template>

      <template v-slot:cell(price)="data">
        {{ data.item.price | currency }}
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
          class="mr-1"
          size="sm"
          @click="showEditProduct(false,row.item)"
        >
          編輯
        </b-button>
        <b-button
          class="mr-1"
          size="sm"
          @click="deleteProduct(row.item)"
        >
          刪除
        </b-button>
      </template>
    </b-table>

    <b-pagination-default
      v-if="!isLoading"
      :pagination="pagination"
      @paginate="getProducts"
    />
  </b-container>
</template>

<script>
import {
  apiAdminGetProducts,
  apiAdminUploadFile,
  apiAdminDeleteProduct
} from '../plugins/axios'

export default {
  name: 'TheDashboardProducts',
  data () {
    return {
      file: null,
      fields: [
        {
          key: 'category',
          label: '分類'
        },
        {
          key: 'title',
          label: '名稱'
        },
        {
          key: 'origin_price',
          label: '原價'
        },
        { key: 'price', label: '售價' },
        {
          key: 'is_enabled',
          label: '是否啟用'
        },
        { key: 'actions', label: '編輯' }
      ],
      isNew: false,
      pagination: {},
      products: [],
      tempProduct: {
        title: '',
        category: '',
        origin_price: null,
        price: null,
        unit: '',
        image: '',
        description: '',
        content: '',
        is_enabled: 1,
        imageUrl: ''
      }
    }
  },
  computed: {
    isLoading () {
      return this.$store.getters.isLoading
    }
  },
  mounted () {
    this.getProducts()
  },
  methods: {
    showEditProduct (isNew, item) {
      if (isNew) {
        this.tempProduct = {}
        this.isNew = true
      } else {
        this.tempProduct = Object.assign({}, item)
        this.isNew = false
      }
      this.$refs['edit-product-modal'].show()
    },
    cancerEditProduct () {
      this.$refs['edit-product-modal'].hide()
    },
    async deleteProduct (item) {
      const response = await apiAdminDeleteProduct(item)
      if (!response.data.success) return
      this.getProducts()
      this.$store.dispatch('alert/setMsgsAlert', {
        msg: response.data.message,
        variant: 'warning',
        id: Math.floor(new Date() / 1000)
      })
    },
    async updateProduct () {
      let api = '/admin/product'
      let httpMethod = 'post'
      if (!this.isNew) {
        api = `/admin/product/${this.tempProduct.id}`
        httpMethod = 'put'
      }
      const response = await this.axios[httpMethod](api, {
        data: this.tempProduct
      })
      if (!response.data.success) {
        this.$refs['edit-product-modal'].hide()
        this.getProducts(this.pagination.current_page)
        this.$store.dispatch('alert/setMsgsAlert', {
          msg: response.data.message,
          variant: 'danger',
          id: Math.floor(new Date() / 1000)
        })
      } else {
        this.$refs['edit-product-modal'].hide()
        this.getProducts(this.pagination.current_page)
        this.$store.dispatch('alert/setMsgsAlert', {
          msg: response.data.message,
          variant: 'primary',
          id: Math.floor(new Date() / 1000)
        })
      }
    },
    async uploadFile () {
      const uploadedFile = this.$refs['file-input'].$refs.input.files[0]
      const formData = new FormData()
      formData.append('file-to-upload', uploadedFile)
      const response = await apiAdminUploadFile(formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      if (!response.data.success) return
      this.$set(this.tempProduct, 'imageUrl', response.data.imageUrl)
    },
    async getProducts (page = 1) {
      const response = await apiAdminGetProducts(page)
      if (!response.data.success) return
      this.products = response.data.products
      this.pagination = response.data.pagination
    }
  }
}
</script>

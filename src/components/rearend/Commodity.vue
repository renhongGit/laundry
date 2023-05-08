<template>
  <div>
    <loading :active.sync="isLoading"></loading>

    <div class="container-fluid">
      <div class="row">
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div
            class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
          >
            <h1 class="h2">商品管理</h1>
            <div class="btn-toolbar mb-2 mb-md-0"></div>
          </div>
          <button
            type="button"
            class="btn btn-primary mb-2"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            @click="clearAddProduct"
          >
            新增商品
          </button>
          <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li class="page-item" v-if="currentPage > 1">
                <a
                  class="page-link"
                  href="#"
                  aria-label="Previous"
                  @click.prevent="setCurrentPage(currentPage - 1)"
                >
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li
                class="page-item"
                v-for="page in pages"
                :key="page"
                :class="{ active: page === currentPage }"
              >
                <a
                  class="page-link"
                  href="#"
                  @click.prevent="setCurrentPage(page)"
                  >{{ page }}</a
                >
              </li>
              <li class="page-item" v-if="currentPage < totalPages">
                <a
                  class="page-link"
                  href="#"
                  aria-label="Next"
                  @click.prevent="setCurrentPage(currentPage + 1)"
                >
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
          <div>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">分類</th>
                  <th scope="col">商品名稱</th>
                  <th scope="col">原價</th>
                  <th scope="col">售價</th>
                  <th scope="col">是否啟用</th>
                  <th scope="col">編輯</th>
                </tr>
              </thead>
              <tbody v-for="(item, key) in specifyPage" :key="key">
                <tr>
                  <th scope="row">{{ item.sort }}</th>
                  <td>{{ item.title }}</td>
                  <td>{{ item.origin_price }}</td>
                  <td>{{ item.price }}</td>
                  <td>
                    <span v-if="item.is_enabled" class="text-success"
                      >啟用</span
                    >
                    <span v-else>未啟用</span>
                  </td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-primary me-2"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal-2"
                      @click="openData(item.id)"
                    >
                      編輯
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary"
                      @click="deleteData(item.id)"
                    >
                      刪除
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- Modal -->
          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-lg">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">新增商品</h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <div class="row">
                    <div class="col-sm-4">
                      <div class="form-group">
                        <label for="image">輸入圖片網址</label>
                        <input
                          type="text"
                          class="form-control"
                          id="image"
                          placeholder="請輸入圖片連結"
                          v-model="addProduct.img"
                        />
                      </div>
                      <div class="form-group">
                        <label for="customFile"
                          >或 上傳圖片
                          <i class="fas fa-spinner fa-spin"></i>
                        </label>
                        <input
                          type="file"
                          id="customFile"
                          class="form-control"
                          ref="files"
                        />
                      </div>
                      <img
                        img="https://images.unsplash.com/photo-1624372635282-b324bcdd4907?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80"
                        class="img-fluid"
                        :src="addProduct.img"
                        alt=""
                      />
                    </div>
                    <div class="col-sm-8">
                      <div class="form-group">
                        <label for="title">標題</label>
                        <input
                          type="text"
                          class="form-control"
                          id="title"
                          placeholder="請輸入標題"
                          v-model="addProduct.title"
                        />
                      </div>

                      <div class="form-row">
                        <div class="form-group col-md-6">
                          <label for="category">分類</label>
                          <input
                            type="text"
                            class="form-control"
                            id="category"
                            placeholder="請輸入分類"
                            v-model="addProduct.sort"
                          />
                        </div>
                        <div class="form-group col-md-6">
                          <label for="price">單位</label>
                          <input
                            type="unit"
                            class="form-control"
                            id="unit"
                            placeholder="請輸入單位"
                            v-model="addProduct.unit"
                          />
                        </div>
                      </div>

                      <div class="form-row">
                        <div class="form-group col-md-6">
                          <label for="origin_price">原價</label>
                          <input
                            type="number"
                            class="form-control"
                            id="origin_price"
                            placeholder="請輸入原價"
                            v-model="addProduct.origin_price"
                          />
                        </div>
                        <div class="form-group col-md-6">
                          <label for="price">售價</label>
                          <input
                            type="number"
                            class="form-control"
                            id="price"
                            placeholder="請輸入售價"
                            v-model="addProduct.price"
                          />
                        </div>
                      </div>
                      <hr />

                      <div class="form-group">
                        <label for="description">產品描述</label>
                        <textarea
                          type="text"
                          class="form-control"
                          id="description"
                          placeholder="請輸入產品描述"
                          v-model="addProduct.description"
                        ></textarea>
                      </div>
                      <div class="form-group">
                        <label for="content">說明內容</label>
                        <textarea
                          type="text"
                          class="form-control"
                          id="content"
                          placeholder="請輸入產品說明內容"
                          v-model="addProduct.content"
                        ></textarea>
                      </div>
                      <div class="form-group">
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="is_enabled"
                            v-model="addProduct.is_enabled"
                            :true-value="1"
                            :false-value="0"
                          />
                          <label class="form-check-label" for="is_enabled">
                            是否啟用
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    取消
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-bs-dismiss="modal"
                    @click="addData()"
                  >
                    新增商品
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- updateData Modal -->
          <div
            class="modal fade"
            id="exampleModal-2"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-lg">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">新增商品</h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <div class="row">
                    <div class="col-sm-4">
                      <div class="form-group">
                        <label for="image">輸入圖片網址</label>
                        <input
                          type="text"
                          class="form-control"
                          id="image"
                          placeholder="請輸入圖片連結"
                          v-model="onlyData.img"
                        />
                      </div>
                      <div class="form-group">
                        <label for="customFile"
                          >或 上傳圖片
                          <i class="fas fa-spinner fa-spin"></i>
                        </label>
                        <input
                          type="file"
                          id="customFile"
                          class="form-control"
                          ref="files"
                        />
                      </div>
                      <img
                        img="https://images.unsplash.com/photo-1624372635282-b324bcdd4907?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80"
                        class="img-fluid"
                        :src="onlyData.img"
                        alt=""
                      />
                    </div>
                    <div class="col-sm-8">
                      <div class="form-group">
                        <label for="title">標題</label>
                        <input
                          type="text"
                          class="form-control"
                          id="title"
                          placeholder="請輸入標題"
                          v-model="onlyData.title"
                        />
                      </div>

                      <div class="form-row">
                        <div class="form-group col-md-6">
                          <label for="category">分類</label>
                          <input
                            type="text"
                            class="form-control"
                            id="category"
                            placeholder="請輸入分類"
                            v-model="onlyData.sort"
                          />
                        </div>
                        <div class="form-group col-md-6">
                          <label for="price">單位</label>
                          <input
                            type="unit"
                            class="form-control"
                            id="unit"
                            placeholder="請輸入單位"
                            v-model="onlyData.unit"
                          />
                        </div>
                      </div>

                      <div class="form-row">
                        <div class="form-group col-md-6">
                          <label for="origin_price">原價</label>
                          <input
                            type="number"
                            class="form-control"
                            id="origin_price"
                            placeholder="請輸入原價"
                            v-model="onlyData.origin_price"
                          />
                        </div>
                        <div class="form-group col-md-6">
                          <label for="price">售價</label>
                          <input
                            type="number"
                            class="form-control"
                            id="price"
                            placeholder="請輸入售價"
                            v-model="onlyData.price"
                          />
                        </div>
                      </div>
                      <hr />

                      <div class="form-group">
                        <label for="description">產品描述</label>
                        <textarea
                          type="text"
                          class="form-control"
                          id="description"
                          placeholder="請輸入產品描述"
                          v-model="onlyData.description"
                        ></textarea>
                      </div>
                      <div class="form-group">
                        <label for="content">說明內容</label>
                        <textarea
                          type="text"
                          class="form-control"
                          id="content"
                          placeholder="請輸入產品說明內容"
                          v-model="onlyData.content"
                        ></textarea>
                      </div>
                      <div class="form-group">
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="is_enabled"
                            v-model="onlyData.is_enabled"
                            :true-value="1"
                            :false-value="0"
                          />
                          <label class="form-check-label" for="is_enabled">
                            是否啟用
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    取消
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-bs-dismiss="modal"
                    @click="updateData(onlyData.id)"
                  >
                    確認修改
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      isLoading: false,
      divider: 6,
      pageSize: 6, // 每頁顯示的數量
      currentPage: 1, // 當前頁碼
      productData: [],
      specifyPage: [],
      onlyData: [],
      addProduct: {
        img: "",
        title: "",
        sort: "",
        unit: "",
        origin_price: "",
        price: "",
        description: "",
        content: "",
        is_enabled: "",
        page: 1,
      },
    };
  },
  created() {
    this.getData();
  },
  computed: {
    // 計算總頁數
    totalPages() {
      return Math.ceil(this.productData.length / this.pageSize);
    },
    // 計算要顯示的頁數列表
    pages() {
      let start = Math.max(1, this.currentPage - 2);
      let end = Math.min(start + 4, this.totalPages);
      let pages = [];

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      return pages;
    },
  },
  methods: {
    getData() {
      let vm = this;
      vm.isLoading = true;
      axios
        .get(`${process.env.VUE_APP_MYAPI}/Commodity`)
        .then((response) => {
          vm.productData = response.data;
          vm.isLoading = false;
          vm.pageContent();
          vm.pageNumber();
        })
        .catch((error) => console.log(error));
    },
    addData() {
      let vm = this;
      vm.pageNumber();
      axios
        .post(`${process.env.VUE_APP_MYAPI}/Commodity`, vm.addProduct)
        .then((response) => {
          vm.getData();
          console.log(response.data);
        })
        .catch((error) => console.log(error));
    },
    deleteData(id) {
      let vm = this;
      axios
        .delete(`${process.env.VUE_APP_MYAPI}/Commodity/${id}`)
        .then((response) => {
          vm.productData = response.data;
          vm.getData();
        })
        .catch((error) => console.log(error));
    },
    openData(id) {
      let vm = this;
      axios
        .get(`${process.env.VUE_APP_MYAPI}/Commodity/${id}`)
        .then((response) => {
          vm.onlyData = response.data;
        })
        .catch((error) => console.log(error));
    },
    updateData(id) {
      let vm = this;
      axios
        .put(`${process.env.VUE_APP_MYAPI}/Commodity/${id}`, vm.onlyData)
        .then((response) => {
          vm.onlyData = response.data;
          vm.getData();
        })
        .catch((error) => console.log(error));
    },
    clearAddProduct() {
      this.addProduct = {
        img: "",
        title: "",
        sort: "",
        unit: "",
        origin_price: "",
        price: "",
        description: "",
        content: "",
        is_enabled: "",
      };
    },
    pageNumber() {
      let len = this.productData.length;
      if (len === 0) {
        this.addProduct.page = 1;
      } else {
        this.addProduct.page = Math.ceil((len + 1) / this.divider);
      }
    },
    setCurrentPage(page) {
      this.currentPage = page;
      this.pageContent();
    },
    pageContent() {
      let data = this.productData;
      let currentPage = this.currentPage;
      this.specifyPage = data.filter((item) => item.page === currentPage);
    },
  },
};
</script>

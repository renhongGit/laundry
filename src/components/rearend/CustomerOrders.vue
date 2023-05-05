<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div
            class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
          >
            <h1 class="h2">訂單管理</h1>
            <div class="btn-toolbar mb-2 mb-md-0"></div>
          </div>
          <button
            type="button"
            class="btn btn-outline-secondary btn-sm mb-3"
            @click="refreshPage"
          >
            重新整理
          </button>
          <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li class="page-item">
                <a class="page-link" href="#" aria-label="Previous">
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
              <li class="page-item">
                <a class="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
          <div>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">客戶</th>
                  <th scope="col">聯絡方式</th>
                  <th scope="col">地址</th>
                  <th scope="col">訂購商品</th>
                  <th scope="col">付款方式</th>
                  <th scope="col">客戶留言</th>
                  <th scope="col">訂單狀態</th>
                </tr>
              </thead>
              <tbody v-for="(item, key) in specifyPage" :key="key">
                <tr>
                  <th scope="row">{{ item.name }} <br />{{ item.time }}</th>
                  <td>{{ item.tel }} <br />{{ item.email }}</td>
                  <td>{{ item.address }}</td>
                  <td class="text-break">
                    <button
                      class="btn btn-primary btn-sm"
                      type="button"
                      data-bs-toggle="collapse"
                      :data-bs-target="'#collapseExample-' + key"
                      aria-expanded="false"
                      :aria-controls="'collapseExample-' + key"
                    >
                      訂購清單
                    </button>
                    <div
                      class="collapse"
                      :id="'collapseExample-' + key"
                      v-for="(carItem, index) in item.shoppingCar"
                      :key="index"
                    >
                      <div class="card card-body">
                        <p>{{ carItem.title }}</p>
                        <p>
                          {{ carItem.quantity }} {{ carItem.unit }} /
                          {{ carItem.price }} =
                          {{ carItem.quantity * carItem.price }}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>{{ item.pay }}<br />總計 : {{ item.money }} 元</td>
                  <td>{{ item.message }}</td>
                  <td>
                    <span v-if="item.progress === '完成訂單'">完成訂單</span>
                    <button
                      v-else
                      type="button"
                      class="btn btn-primary btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      完成訂單
                    </button>
                    <!-- 完成訂單Modal -->
                    <div
                      class="modal fade"
                      id="exampleModal"
                      tabindex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">
                              完成訂單
                            </h5>
                            <button
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div class="modal-body">
                            再次確認已完成 {{ item.name }} 的訂單
                          </div>
                          <div class="modal-footer">
                            <button
                              type="button"
                              class="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              NO
                            </button>
                            <button
                              type="button"
                              class="btn btn-primary"
                              data-bs-dismiss="modal"
                              @click="completeOrder(item.id)"
                            >
                              YES
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
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
      userShopping: [],
      divider: 6,
      pageSize: 6, // 每頁顯示的數量
      currentPage: 1, // 當前頁碼
      specifyPage: [],
    };
  },
  created() {
    this.getUserShopping();
  },
  computed: {
    // 計算總頁數
    totalPages() {
      return Math.ceil(this.userShopping.length / this.pageSize);
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
    getUserShopping() {
      axios
        .get(`http://localhost:3000/userShopping`)
        .then((response) => {
          this.userShopping = response.data;
          this.shoppingCar = response.data.shoppingCar;
          this.pageContent();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    completeOrder(id) {
      axios
        .patch(`http://localhost:3000/userShopping/${id}`, {
          progress: "完成訂單",
        })
        .then((response) => {
          console.log(id);
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      this.refreshPage();
    },
    refreshPage() {
      // 重新載入當前頁面
      this.$router.go(0);
    },
    setCurrentPage(page) {
      this.currentPage = page;
      this.pageContent();
      console.log(this.currentPage);
    },
    pageContent() {
      let data = this.userShopping;
      let currentPage = this.currentPage;
      this.specifyPage = data.filter((item) => item.page === currentPage);
      console.log(this.specifyPage);
    },
  },
};
</script>

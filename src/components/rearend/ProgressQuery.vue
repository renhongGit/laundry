<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div
            class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
          >
            <h1 class="h2">進度查詢</h1>
            <div class="btn-toolbar mb-2 mb-md-0"></div>
          </div>

          <div class="table-responsive">
            <span class="input-group-text mt-1 w-25 mx-auto"
              >輸入姓名 或 手機末五碼查詢</span
            >
            <span class="text-danger" v-show="errors.has('name')">{{
              errors.first("name")
            }}</span>
            <span class="text-danger" v-show="errors.has('searchNumber')">{{
              errors.first("searchNumber")
            }}</span>
            <div class="w-25 input-group m-3 mx-auto">
              <input
                type="text"
                name="name"
                class="form-control"
                placeholder="姓名"
                aria-describedby="button-addon2"
                v-model="searchName"
                v-validate="{ nameRules: true }"
                data-vv-as="姓名"
              />

              <input
                type="text"
                name="searchNumber"
                class="form-control w-25"
                placeholder="手機末五碼"
                aria-describedby="button-addon2"
                v-model="searchNumber"
                v-validate="{ lastfive: true }"
                data-vv-as="末五碼"
                maxlength="5"
              />

              <button
                class="btn btn-outline-secondary"
                type="button"
                id="button-addon2"
                @click="find()"
              >
                查詢
              </button>
            </div>
            <button
              type="button"
              class="btn btn-outline-secondary btn-sm"
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
            <table
              class="table table-striped table-sm mt-4 text-break align-middle"
              v-if="switchList"
              v-for="(item, key) in specifyPage"
              :key="key"
            >
              <thead>
                <tr>
                  <th class="col-1">日期</th>
                  <th class="col-2">姓名</th>
                  <th class="col-2">電話</th>
                  <th class="col-2">送洗項目</th>
                  <th class="col-2">目前進度</th>
                  <th class="col-2">備註</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{ item.time }}</td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.tel }}{{ item.lastfive }}</td>
                  <td>
                    <table>
                      <tbody>
                        <tr v-for="(value, prop) in item.clothing" :key="prop">
                          <td>{{ prop }}</td>
                          <td>{{ value.num }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                  <td>
                    {{ item.progress }}
                    <button
                      type="button"
                      class="btn btn-outline-primary btn-sm m-1"
                      :data-id="item.id"
                      @click="completeCleaning($event)"
                      v-if="item.progress == '送洗中'"
                    >
                      待取件
                    </button>
                    <button
                      type="button"
                      class="btn btn-outline-primary btn-sm m-1"
                      :data-id="item.id"
                      @click="pickedUp($event)"
                      v-if="item.progress == '已完成清洗，待取件。'"
                    >
                      完成取件
                    </button>
                  </td>

                  <td>{{ item.remark }}</td>
                </tr>
              </tbody>
            </table>

            <table
              class="table table-striped table-sm mt-4 align-middle"
              v-if="!switchList"
              v-for="item in specifyContent"
              :key="item.id"
            >
              <thead>
                <tr>
                  <th class="col">日期</th>
                  <th class="col">姓名</th>
                  <th class="col">電話</th>
                  <th class="col">送洗項目</th>
                  <th class="col">目前進度</th>
                  <th class="col">備註</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{ item.time }}</td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.tel }}{{ item.lastfive }}</td>
                  <td>
                    <table>
                      <tbody>
                        <tr
                          v-for="(value, propp) in item.clothing"
                          :key="propp"
                        >
                          <td>{{ propp }}</td>
                          <td>{{ value.num }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                  <td>
                    {{ item.progress }}
                    <button
                      type="button"
                      class="btn btn-outline-primary btn-sm m-1"
                      :data-id="item.id"
                      @click="completeCleaning($event)"
                      v-if="item.progress == '送洗中'"
                    >
                      待取件
                    </button>
                    <button
                      type="button"
                      class="btn btn-outline-primary btn-sm m-1"
                      :data-id="item.id"
                      @click="pickedUp($event)"
                      v-if="item.progress == '已完成清洗，待取件。'"
                    >
                      完成取件
                    </button>
                  </td>

                  <td>{{ item.remark }}</td>
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
      customer: [],
      searchNumber: "",
      searchName: "",
      specifyContent: [],
      specifyPage: [],
      switchList: true,
      pageSize: 6, // 每頁顯示的數量
      currentPage: 1, // 當前頁碼
    };
  },
  created() {
    this.getData();
  },
  mounted() {
    this.getData();
  },
  computed: {
    // 計算總頁數
    totalPages() {
      return Math.ceil(this.customer.length / this.pageSize);
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
      axios
        .get("http://localhost:3000/laundry")
        .then((response) => {
          vm.customer = response.data;
          console.log(response.data);
          this.pageContent();
        })
        .catch((error) => console.log(error));
    },
    find() {
      let vm = this;

      this.$validator.validateAll().then((result) => {
        if (result) {
          // 表單驗證成功

          vm.switchList = false;
          switch (true) {
            case !!vm.searchNumber:
              vm.specifyContent = vm.customer.filter(
                (obj) => obj.lastfive == vm.searchNumber
              );
              break;
            case !!vm.searchName:
              vm.specifyContent = vm.customer.filter(
                (obj) => obj.name == vm.searchName
              );
              break;
            default:
              vm.specifyContent = [];
          }

          vm.searchNumber = "";
          vm.searchName = "";
          console.log(vm.specifyContent);
          console.log(vm.switchList);
        } else {
          // 表單驗證失敗
          this.$nextTick(() => {
            // 顯示所有錯誤訊息
            const errors = this.$validator.errors.items.map(
              (item) => `${item.field} ${item.msg}`
            );
            alert(`請檢查您的輸入是否正確：\n${errors.join("\n")}`);
          });
        }
      });
    },
    completeCleaning(event) {
      let vm = this;
      let id = event.currentTarget.dataset.id;
      console.log(id);
      axios
        .patch(`http://localhost:3000/laundry/${id}`, {
          progress: "已完成清洗，待取件。",
        })
        .then((response) => {
          console.log(response);
          // 重新取得資料並更新 specifyContent

          axios
            .get("http://localhost:3000/laundry")
            .then((response) => {
              vm.customer = response.data;
              vm.specifyContent = vm.customer.filter((obj) => obj.id == id);
              vm.pageContent();
              console.log(specifyContent);
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => {
          console.log(error);
        });
    },
    pickedUp(event) {
      let vm = this;
      let id = event.currentTarget.dataset.id;
      console.log(id);
      axios
        .patch(`http://localhost:3000/laundry/${id}`, {
          progress: "已取件。",
        })
        .then((response) => {
          console.log(response);
          // 重新取得資料並更新 specifyContent
          axios
            .get("http://localhost:3000/laundry")
            .then((response) => {
              vm.customer = response.data;
              vm.specifyContent = vm.customer.filter((obj) => obj.id == id);
              vm.pageContent();
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => {
          console.log(error);
        });
    },
    refreshPage() {
      this.$router.go(0);
    },
    setCurrentPage(page) {
      this.currentPage = page;
      this.pageContent();
      console.log(this.currentPage);
    },
    pageContent() {
      let data = this.customer;
      let currentPage = this.currentPage;
      this.specifyPage = data.filter((item) => item.page === currentPage);
      console.log(this.specifyPage);
    },
  },
};
</script>

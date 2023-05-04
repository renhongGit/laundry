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
                  <th scope="col">完成訂單</th>
                </tr>
              </thead>
              <tbody v-for="(item, key) in userShopping" :key="key">
                <tr>
                  <th scope="row">{{ item.name }} <br />{{ item.time }}</th>
                  <td>{{ item.tel }} <br />{{ item.email }}</td>
                  <td>{{ item.address }}</td>
                  <td class="text-break">
                    <button
                      class="btn btn-primary btn-sm"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseExample"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    >
                      訂購清單
                    </button>
                    <div
                      class="collapse"
                      id="collapseExample"
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
                    <button
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
                              @click="removeOrder(item.id)"
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
    };
  },
  created() {
    this.getUserShopping();
  },
  methods: {
    getUserShopping() {
      axios
        .get(`http://localhost:3000/userShopping`)
        .then((response) => {
          this.userShopping = response.data;
          this.shoppingCar = response.data.shoppingCar;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    removeOrder(id) {
      axios
        .delete(`http://localhost:3000/userShopping/${id}`)
        .then((response) => {
          this.refreshPage();
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    refreshPage() {
      // 重新載入當前頁面
      this.$router.go(0);
    },
  },
};
</script>

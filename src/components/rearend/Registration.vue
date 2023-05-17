<template>
  <div class="bg">
    <loading :active.sync="isLoading"></loading>
    <div class="container-fluid">
      <div class="row">
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div
            class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
          >
            <h1 class="h2">送洗登記</h1>
            <div class="btn-toolbar mb-2 mb-md-0"></div>
          </div>

          <div class="d-flex">
            <!-- 左側欄位-->
            <div class="container w-50">
              <div class="row w-75">
                <form>
                  <input
                    type="text"
                    name="name"
                    class="form-control col me-4 mb-2 text-center"
                    placeholder="請輸入姓名"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    v-model="userData.name"
                    v-validate="{ required: true, nameRules: true }"
                    data-vv-as="姓名"
                  />
                  <span class="text-danger" v-show="errors.has('name')">{{
                    errors.first("name")
                  }}</span>
                  <div class="d-flex mb-2">
                    <input
                      type="text"
                      name="firstFive"
                      class="form-control col me-1 text-center"
                      placeholder="09876"
                      aria-label="firstFive"
                      aria-describedby="basic-addon1"
                      v-model="userData.tel"
                      @input="onInput1Input"
                      v-validate="'required'"
                      data-vv-as="手機前五碼"
                      minlength="5"
                      maxlength="5"
                    />
                    <input
                      type="text"
                      name="lastfive"
                      class="form-control col text-center"
                      placeholder="54321"
                      aria-label="lastfive"
                      aria-describedby="basic-addon1"
                      v-model="userData.lastfive"
                      ref="input2"
                      v-validate="'required'"
                      data-vv-as="末五碼"
                      maxlength="5"
                      minlength="5"
                    />
                  </div>
                  <span class="text-danger" v-show="errors.has('firstFive')">{{
                    errors.first("firstFive")
                  }}</span>

                  <span class="text-danger" v-show="errors.has('lastfive')">{{
                    errors.first("lastfive")
                  }}</span>
                </form>
              </div>
              <div class="row mt-4 w-75 card">
                <div class="card card-body">
                  <button
                    class="btn btn-outline-primary mb-2"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseExample"
                    aria-expanded="false"
                    aria-controls="collapseExample"
                  >
                    衣物分類
                  </button>
                  <div class="collapse" id="collapseExample">
                    <button
                      type="button"
                      class="btn btn-outline-primary btn-sm m-1"
                      data-bs-toggle="button"
                      autocomplete="off"
                      value="棉T"
                      @click="addNewClothing($event.target.value)"
                    >
                      棉T
                    </button>
                    <button
                      type="button"
                      class="btn btn-outline-primary btn-sm m-1"
                      data-bs-toggle="button"
                      autocomplete="off"
                      value="襯衫"
                      @click="addNewClothing($event.target.value)"
                    >
                      襯衫
                    </button>
                    <button
                      type="button"
                      class="btn btn-outline-primary btn-sm m-1"
                      data-bs-toggle="button"
                      autocomplete="off"
                      value="西裝上衣"
                      @click="addNewClothing($event.target.value)"
                    >
                      西裝上衣
                    </button>
                  </div>
                </div>
              </div>
              <div class="row mt-4 w-75 card">
                <div class="card card-body">
                  <button
                    class="btn btn-outline-primary mb-2"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseExample-a"
                    aria-expanded="false"
                    aria-controls="collapseExample-a"
                  >
                    床組分類
                  </button>
                  <div class="collapse" id="collapseExample-a">
                    <button
                      type="button"
                      class="btn btn-outline-primary btn-sm m-1"
                      data-bs-toggle="button"
                      autocomplete="off"
                      value="床組(整套)"
                      @click="addNewClothing($event.target.value)"
                    >
                      床組(整套)
                    </button>
                    <button
                      type="button"
                      class="btn btn-outline-primary btn-sm m-1"
                      data-bs-toggle="button"
                      autocomplete="off"
                      value="床包"
                      @click="addNewClothing($event.target.value)"
                    >
                      床包
                    </button>
                    <button
                      type="button"
                      class="btn btn-outline-primary btn-sm m-1"
                      data-bs-toggle="button"
                      autocomplete="off"
                      value="被套"
                      @click="addNewClothing($event.target.value)"
                    >
                      被套
                    </button>
                    <button
                      type="button"
                      class="btn btn-outline-primary btn-sm m-1"
                      data-bs-toggle="button"
                      autocomplete="off"
                      value="枕頭套"
                      @click="addNewClothing($event.target.value)"
                    >
                      枕頭套
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <!-- 右側 -->
            <div class="container w-50">
              <ul class="border border-2 p-3">
                <li
                  class="row justify-content-center pb-2 mb-2 border-bottom"
                  v-for="(item, key) in userData.clothing"
                  :key="key"
                >
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-close my-auto col-1 me-5"
                    @click="removeClothing(key)"
                  ></button>
                  <span class="col-3 badge bg-light text-dark fs-6 my-auto">{{
                    key
                  }}</span>
                  <span
                    class="col-4 badge text-dark fs-6 d-flex align-items-center ms-5"
                    >數量 :
                    <input
                      type="number"
                      class="form-control ms-3"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-sm"
                      onfocus="this.value=''"
                      v-model="item.num"
                    />
                  </span>
                </li>
                <li class="d-flex flex-column m-3 pb-3 border-bottom">
                  <textarea
                    class="form-control"
                    aria-label="With textarea"
                    v-model="userData.remark"
                    maxlength="30"
                  ></textarea>
                </li>
                <li class="d-flex justify-content-between">
                  <span class="badge bg-light text-dark fs-4 my-auto"
                    >總計送洗:{{ parseInt(userData.total) }}件
                  </span>
                  <div>
                    <button
                      type="button"
                      class="btn btn-outline-secondary me-3"
                      @click="clearAll()"
                    >
                      取消
                    </button>
                    <button
                      type="button"
                      class="btn btn-outline-primary"
                      @click="addData()"
                    >
                      確定送出
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>
<style scoped>
.bg {
  background: #ffffff;
}
</style>
<script>
import axios from "axios";
export default {
  data() {
    return {
      isLoading: false,
      divider: 6,
      customers: [],
      userData: {
        name: "",
        tel: "",
        lastfive: "",
        time: null,
        progress: "送洗中",
        remark: "",
        clothing: {},
        total: 0,
        page: 1,
      },
    };
  },
  created() {
    this.getData();
  },
  mounted() {
    const now = new Date();
    this.userData.time = now.toLocaleString();
  },

  methods: {
    getData() {
      let vm = this;
      vm.isLoading = true;
      axios
        .get(`${process.env.VUE_APP_MYAPI}/laundry`)
        .then((response) => {
          vm.customers = response.data;
          vm.pageNumber(); // 在新增資料後呼叫 pageNumber 方法更新頁碼
          vm.isLoading = false;
        })
        .catch((error) => console.log(error));
    },
    addData() {
      let vm = this;

      this.$validator.validateAll().then((result) => {
        if (result) {
          // 表單驗證成功

          axios
            .post(`${process.env.VUE_APP_MYAPI}/laundry`, vm.userData)
            .then((response) => {
              vm.customer = response.data;
              vm.clearAll();
              vm.getData();

              // 清空錯誤訊息
              this.$nextTick(() => {
                this.$validator.reset();
              });
            })
            .catch((error) => console.log(error));
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
    addNewClothing(val) {
      let vm = this;
      vm.$set(vm.userData.clothing, val, {
        num: 0,
      });
    },
    clearAll() {
      let vm = this;
      vm.userData.clothing = {};
      vm.userData.total = 0;
      vm.userData.name = "";
      vm.userData.tel = "";
      vm.userData.lastfive = "";
      vm.userData.remark = "";
    },
    removeClothing(key) {
      let vm = this;
      vm.$delete(vm.userData.clothing, key);
    },
    onInput1Input(event) {
      if (event.target.value.length >= 5) {
        this.$refs.input2.focus();
      }
    },
    pageNumber() {
      let len = this.customers.length;
      if (len === 0) {
        this.userData.page = 1;
      } else {
        this.userData.page = Math.ceil((len + 1) / this.divider);
      }
    },
  },
  watch: {
    "userData.clothing": {
      handler: function (newVal, oldVal) {
        this.userData.total = Object.values(newVal).reduce(
          (total, item) => total + parseInt(item.num),
          0
        );
      },
      deep: true,
    },
  },
};
</script>

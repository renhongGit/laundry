<template>
  <div class="container">
    <main class="mx-auto text-center mt-5">
      <span class="text-danger" v-show="errors.has('searchNumber')">{{
        errors.first("searchNumber")
      }}</span>
      <input
        class="form-control form-control-dark mx-auto border"
        type="text"
        placeholder="輸入手機末五碼查詢"
        aria-label="Search"
        style="width: 170px"
        v-model="searchNumber"
        name="searchNumber"
        v-validate="{ lastfive: true }"
        data-vv-as="查詢欄位"
        maxlength="5"
      />
      <button
        type="button"
        class="btn btn-outline-secondary mt-3"
        @click="find"
      >
        查詢
      </button>
      <h2 class="mt-5">送洗進度</h2>
      <div class="table-responsive mt-3">
        <table class="table table-striped table-sm align-middle">
          <thead>
            <tr>
              <th scope="col">姓名</th>
              <th scope="col">送洗日期</th>
              <th scope="col">洗滌內容</th>
              <th scope="col">目前進度</th>
              <th scope="col">備註</th>
            </tr>
          </thead>
          <tbody v-for="(item, key) in specifyContent" :key="key">
            <tr>
              <td>{{ item.name }}</td>
              <td>{{ item.time }}</td>
              <td>
                <div v-for="(value, index) in item.clothing" :key="index">
                  <p>{{ index }} {{ value.num }}</p>
                </div>
              </td>
              <td>{{ item.progress }}</td>
              <td>
                {{ item.remark }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>
<style scoped>
.container {
  height: 70vh;
}
.form-control:hover {
  transform: scale(1.1);
}

.btn:hover {
  transform: scale(1.05);
}
</style>

<script>
import axios from "axios";

export default {
  data() {
    return {
      phone: "",
      userData: [],
      specifyContent: [],
      searchNumber: "",
    };
  },
  created() {
    this.getUserData();
  },
  methods: {
    getUserData() {
      axios
        .get(`${process.env.VUE_APP_MYAPI}/laundry`)
        .then((response) => {
          this.userData = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    find() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          // 表單驗證成功
          let vm = this;
          vm.switchList = false;
          switch (true) {
            case !!vm.searchNumber:
              vm.specifyContent = vm.userData.filter(
                (obj) => obj.lastfive == vm.searchNumber
              );
              break;
            default:
              vm.specifyContent = [];
          }

          vm.searchNumber = "";
          console.log(vm.switchList);
        } else {
          // 表單驗證失敗
          this.$nextTick(() => {
            // 清空錯誤訊息
            this.$refs.form.reset();
            // 顯示所有錯誤訊息
            const errors = this.$validator.errors.items.map(
              (item) => `${item.field} ${item.msg}`
            );
            alert(`請檢查您的輸入是否正確：\n${errors.join("\n")}`);
          });
        }
      });
    },
  },
};
</script>

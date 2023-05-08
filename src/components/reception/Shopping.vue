<template>
  <div class="container">
    <h2>顧客資訊</h2>
    <div class="row">
      <div class="col">
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">姓名 </label>

          <input
            type="text"
            name="name"
            class="form-control mb-2"
            id="exampleFormControlInput1"
            placeholder="請輸入姓名"
            v-model="user.name"
            v-validate="{ required: true, nameRules: true }"
            data-vv-as="姓名"
          />
          <span class="text-danger" v-show="errors.has('name')">{{
            errors.first("name")
          }}</span>
        </div>

        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">手機 </label>
          <input
            type="tel"
            name="tel"
            class="form-control mb-2"
            id="exampleFormControlInput1"
            placeholder="請輸入手機號碼"
            v-model="user.tel"
            v-validate="{ required: true, telRules: true }"
            data-vv-as="手機"
          />
          <span class="text-danger" v-show="errors.has('tel')">{{
            errors.first("tel")
          }}</span>
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">地址 </label>
          <input
            type="text"
            name="address"
            class="form-control mb-2"
            id="exampleFormControlInput1"
            placeholder="請輸入地址"
            v-model="user.address"
            v-validate="{ required: true, addressRules: true }"
            data-vv-as="地址"
          />
          <span class="text-danger" v-show="errors.has('address')">{{
            errors.first("address")
          }}</span>
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label"
            >Email
          </label>
          <input
            type="email"
            name="email"
            class="form-control mb-2"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
            v-model="user.email"
            v-validate="'required|email'"
            data-vv-as="Email"
          />
          <span class="text-danger" v-show="errors.has('email')">{{
            errors.first("email")
          }}</span>
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label"
            >請選擇付款方式
          </label>
          <select
            id="fruit-select"
            name="fruit"
            class="form-control"
            v-model="user.pay"
            v-validate="'required'"
            data-vv-as="請選其中一個方式付款"
          >
            <option value="ATM">ATM</option>
            <option value="WebATM">WebATM</option>
            <option value="ApplePay">ApplePay</option>
            <option value="GooglePay">GooglePay</option>
          </select>
          <span class="text-danger" v-show="errors.has('fruit')">{{
            errors.first("fruit")
          }}</span>
        </div>
        <div class="mb-3">
          <label for="exampleFormControlTextarea1" class="form-label"
            >留言給我們</label
          >
          <textarea
            name="message"
            class="form-control mb-2"
            id="exampleFormControlTextarea1"
            rows="2"
            maxlength="26"
            v-model="user.message"
            v-validate="{ messageRules: true }"
            data-vv-as="留言"
          ></textarea>
          <span class="text-danger" v-show="errors.has('message')">{{
            errors.first("message")
          }}</span>
        </div>
        <button type="button" class="btn btn-primary w-100" @click="checkout()">
          結帳
        </button>
      </div>

      <div class="col">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">商品名稱</th>
              <th scope="col">商品預覽</th>
              <th scope="col">數量</th>
              <th>價格</th>
            </tr>
          </thead>
          <tbody v-for="(item, key) in user.shoppingCar" :key="key">
            <tr>
              <th>{{ item.title }}</th>
              <td><img class="img" :src="item.img" alt="" /></td>
              <td>{{ item.quantity }}</td>
              <td>{{ item.price * item.quantity }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td>總計金額 : NT. {{ total }}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</template>
<style scoped>
.img {
  object-fit: cover;
  object-position: center center;
  width: 100px;
  height: 120px;
}
</style>

<script>
import axios from "axios";
export default {
  data() {
    return {
      divider: 6,
      userData: [],
      user: {
        time: "",
        pay: "",
        name: "",
        tel: "",
        email: "",
        address: "",
        message: "",
        money: 0,
        shoppingCar: [],
        page: 1,
        progress: "訂單已成立",
      },
    };
  },
  created() {
    this.getUserShopping();
    this.getData();
  },
  mounted() {
    const now = new Date();
    this.user.time = now.toLocaleString(); // 設定現在時間
  },
  computed: {
    total() {
      let sum = 0;
      for (let item of this.user.shoppingCar) {
        sum += item.price * item.quantity;
      }
      this.user.money = sum;
      return sum;
    },
  },
  methods: {
    getData() {
      axios
        .get(`${process.env.VUE_APP_MYAPI}/userShopping`)
        .then((response) => {
          this.userData = response.data;
          this.pageNumber();
        })
        .catch((error) => console.log(error));
    },
    getUserShopping() {
      axios
        .get(`${process.env.VUE_APP_MYAPI}/shopping`)
        .then((response) => {
          this.user.shoppingCar = response.data;
        })
        .catch((error) => console.log(error));
    },
    checkout() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          // 表單驗證成功
          this.isProcessing = true; // 顯示 loading 畫面或禁用按鈕
          axios
            .post(`${process.env.VUE_APP_MYAPI}/userShopping`, this.user)
            .then((response) => {
              console.log(response.data);
              this.$router.push("/shoppingend");
              this.getData();
            })
            .catch((error) => {
              console.error(error);
              alert("系統錯誤，請稍後再試");
            })
            .finally(() => {
              this.isProcessing = false; // 隱藏 loading 畫面或啟用按鈕
            });
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
    pageNumber() {
      let len = this.userData.length;
      console.log(len);
      if (len === 0) {
        this.user.page = 1;
      } else {
        this.user.page = Math.ceil((len + 1) / this.divider);
      }
    },
  },
};
</script>

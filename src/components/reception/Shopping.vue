<template>
  <div class="container">
    <h2>顧客資訊</h2>
    <div class="row">
      <div class="col">
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">姓名 </label>
          <input
            type="name"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="請輸入姓名"
            v-model="user.name"
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">電話 </label>
          <input
            type="tel"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="請輸入電話號碼"
            v-model="user.tel"
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">地址 </label>
          <input
            type="text"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="請輸入地址"
            v-model="user.address"
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label"
            >Email
          </label>
          <input
            type="email"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
            v-model="user.email"
          />
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
          >
            <option value="ATM">ATM</option>
            <option value="WebATM">WebATM</option>
            <option value="ApplePay">ApplePay</option>
            <option value="GooglePay">GooglePay</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="exampleFormControlTextarea1" class="form-label"
            >Example textarea</label
          >
          <textarea
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            v-model="user.message"
          ></textarea>
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
        .get(`http://localhost:3000/userShopping`)
        .then((response) => {
          this.userData = response.data;
          this.pageNumber(); // 在新增資料後呼叫 pageNumber 方法更新頁碼
          console.log(response.data);
        })
        .catch((error) => console.log(error));
    },
    getUserShopping() {
      axios
        .get(`http://localhost:3000/shopping`)
        .then((response) => {
          this.user.shoppingCar = response.data;
          console.log(response.data);
          console.log(this.user);
        })
        .catch((error) => console.log(error));
    },
    checkout() {
      axios
        .post("http://localhost:3000/userShopping", this.user)
        .then((response) => {
          console.log(response.data);
          // 將路由導向到 "/shoppingend"
          this.$router.push("/shoppingend");
          this.getData();
        })
        .catch((error) => {
          console.log(error);
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

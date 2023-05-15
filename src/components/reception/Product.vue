<template>
  <div class="container mt-4">
    <shopping-bubble></shopping-bubble>
    <div class="row">
      <div class="col-6"><img class="img" :src="product.img" alt="" /></div>
      <div class="col d-flex flex-column justify-content-between">
        <h3 class="fw-bold">{{ product.title }}</h3>
        <p class="fs-5 text">
          {{ product.content }}
        </p>
        <div>
          <span> 售價 : NT. {{ product.origin_price }}</span>
          <span> 特價 : NT. {{ product.price }}</span>
        </div>

        <div class="d-flex justify-content-between">
          <div class="input-group w-25">
            <button
              class="btn btn-outline-secondary"
              type="button"
              id="button-addon1"
              @click="incrementQuantity"
            >
              +
            </button>
            <input
              type="number"
              class="form-control text-center"
              placeholder=""
              aria-label="Example text with button addon"
              aria-describedby="button-addon1"
              v-model="userProduct.quantity"
              min="0"
              max="10"
              @input="checkQuantity"
            />
            <button
              class="btn btn-outline-secondary"
              type="button"
              id="button-addon1"
              @click="minusQuantity"
            >
              -
            </button>
          </div>
          <button type="button" class="btn btn-primary" @click="addShopping">
            加入購物車
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.img {
  object-fit: cover;
  object-position: center center;
  width: 90%;
  height: 400px;
}
/* 將 input[type="number"] 的箭頭設為透明 */
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* 隱藏 up 和 down 的箭頭 */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>

<script>
import axios from "axios";
import ShoppingBubble from "@/components/reception/shoppingBubble.vue";
export default {
  data() {
    return {
      product: {},

      userProduct: {
        quantity: 1,
        title: "",
        price: "",
        unit: "",
        img: "",
      },
    };
  },
  components: {
    ShoppingBubble,
  },
  mounted() {
    axios
      .get(`${process.env.VUE_APP_MYAPI}/Commodity/${this.$route.params.id}`)
      .then((response) => {
        this.product = response.data;
      })
      .catch((error) => console.log(error));
  },
  methods: {
    incrementQuantity() {
      if (this.userProduct.quantity < 10) {
        this.userProduct.quantity += 1;
      }
    },
    minusQuantity() {
      if (this.userProduct.quantity > 0) {
        this.userProduct.quantity -= 1;
      }
    },
    checkQuantity() {
      if (this.userProduct.quantity < 0) {
        this.userProduct.quantity = 0;
      } else if (this.userProduct.quantity > 10) {
        this.userProduct.quantity = 10;
      }
    },
    addShopping() {
      this.userProduct = Object.assign({}, this.userProduct, {
        title: this.product.title,
        price: this.product.price,
        unit: this.product.unit,
        img: this.product.img,
      });
      axios
        .post(`${process.env.VUE_APP_MYAPI}/shopping`, this.userProduct)
        .then((response) => {
          this.refreshPage();
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    refreshPage() {
      this.$router.go(0);
    },
  },
};
</script>

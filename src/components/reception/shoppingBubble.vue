<template>
  <div>
    <!-- 在畫面最上方固定懸浮泡泡 -->
    <div class="shopping-bubble">
      <button
        type="button"
        class="btn btn-primary position-relative"
        data-bs-toggle="modal"
        data-bs-target="#cartModal"
        @click="getUserProduct()"
      >
        <i class="bi bi-cart-fill me-1"></i> 購物車
        <span
          class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
          v-if="userProduct.length > 0"
          >{{ userProduct.length }}
          <span class="visually-hidden">unread messages</span></span
        >
      </button>
    </div>

    <!-- Modal  -->
    <div
      class="modal fade"
      id="cartModal"
      tabindex="-1"
      aria-labelledby="cartModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="cartModalLabel">您的購物車</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <!-- 購物車內容 -->
            <table class="table text-center">
              <thead>
                <tr>
                  <th scope="col">商品</th>
                  <th scope="col">數量</th>
                  <th scope="col">刪除</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, key) in userProduct" :key="key">
                  <th scope="row" class="fs-5 text">{{ item.title }}</th>
                  <td class="d-flex justify-content-center">
                    <button
                      class="btn btn-outline-secondary"
                      type="button"
                      id="button-addon1"
                      @click="incrementQuantity(key)"
                    >
                      +
                    </button>
                    <input
                      type="number"
                      class="form-control text-center w-25"
                      placeholder=""
                      aria-label="Example text with button addon"
                      aria-describedby="button-addon1"
                      :value="item.quantity"
                      min="0"
                      max="10"
                      @input="checkQuantity(key, $event.target.value)"
                    />
                    <button
                      class="btn btn-outline-secondary"
                      type="button"
                      id="button-addon1"
                      @click="minusQuantity(key)"
                    >
                      -
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-outline-secondary"
                      @click="removeProduct(key)"
                    >
                      <i class="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              再逛一下
            </button>
            <router-link to="/Shopping">
              <button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
                v-if="userProduct.length > 0"
              >
                結帳
              </button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.shopping-bubble {
  position: fixed;
  top: 4;
  right: 5%;
  z-index: 11;
}
</style>

<script>
import axios from "axios";
export default {
  data() {
    return {
      userProduct: [],
    };
  },

  created() {
    this.getUserProduct();
  },
  methods: {
    getUserProduct() {
      axios
        .get(`${process.env.VUE_APP_MYAPI}/shopping`)
        .then((response) => {
          this.userProduct = response.data;
          console.log(this.userProduct);
        })
        .catch((error) => console.log(error));
    },
    incrementQuantity(index) {
      if (this.userProduct[index].quantity < 10) {
        this.userProduct[index].quantity += 1;
        axios
          .patch(
            `${process.env.VUE_APP_MYAPI}/shopping/${this.userProduct[index].id}`,
            {
              quantity: this.userProduct[index].quantity,
            }
          )
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    minusQuantity(index) {
      if (this.userProduct[index].quantity > 0) {
        this.userProduct[index].quantity -= 1;
        axios
          .patch(
            `${process.env.VUE_APP_MYAPI}/shopping/${this.userProduct[index].id}`,
            {
              quantity: this.userProduct[index].quantity,
            }
          )
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    checkQuantity(index, value) {
      if (value < 0) {
        this.userProduct[index].quantity = 0;
      } else if (value > 10) {
        this.userProduct[index].quantity = 10;
      } else {
        this.userProduct[index].quantity = value;
      }

      axios
        .patch(
          `${process.env.VUE_APP_MYAPI}/shopping/${this.userProduct[index].id}`,
          {
            quantity: this.userProduct[index].quantity,
          }
        )
        .then((response) => {
          this.userProduct[index].quantity = response.data.quantity;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    removeProduct(index) {
      const productId = this.userProduct[index].id;
      axios
        .delete(`${process.env.VUE_APP_MYAPI}/shopping/${productId}`)
        .then(() => {
          this.userProduct.splice(index, 1);
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

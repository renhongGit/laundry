<template>
  <div class="container">
    <div class="d-flex flex-wrap">
      <div class="commodity m-1" v-for="(item, key) in productData" :key="key">
        <router-link
          :to="{ name: 'product', params: { id: item.id } }"
          class="my-link-class"
        >
          <div class="card h-100">
            <div class="card-body">
              <img
                :src="item.img"
                class="card-img-top commodityImg mb-3"
                alt="..."
              />
              <h5 class="card-title fw-bold">{{ item.title }}</h5>
              <p class="card-text fs-6 text">{{ item.description }}</p>
            </div>
            <div
              class="d-flex justify-content-between align-items-baseline px-3"
            >
              <span class="text-decoration-line-through"
                >售價: NT. {{ item.origin_price }}</span
              >
              <span class="fs-5">特價: NT. {{ item.price }}</span>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style>
.my-link-class {
  color: inherit; /* 取消文字顏色預設值 */

  text-decoration: none; /* 取消底線 */
}
.my-link-class:hover {
  /* 取消效果 */
  color: inherit;
  text-decoration: none;
}

.commodity {
  width: 240px;
  height: 440px;
}
.commodityImg {
  object-fit: cover;
  object-position: center center;
  width: 210px;
  height: 275px;
}
</style>

<script>
import axios from "axios";

export default {
  data() {
    return {
      productData: [],
    };
  },
  created() {
    this.getData();
  },

  methods: {
    getData() {
      let vm = this;
      axios
        .get("http://localhost:3000/Commodity")
        .then((response) => {
          vm.productData = response.data.filter(
            (item) => item.sort === "衣物用具" && item.is_enabled !== 0
          );
          console.log(vm.productData);
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

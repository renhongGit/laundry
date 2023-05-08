<template>
  <div>
    <shopping-bubble></shopping-bubble>
    <main class="container mt-5">
      <h3 class="mb-4">洗衣用品</h3>
      <div class="d-flex w-100">
        <div style="width: 15%" class="list-group mt-2 me-4">
          <router-link
            class="list-group-item list-group-item-action"
            :class="{ active: $route.path === '/laundrysupplies/clean' }"
            to="/laundrysupplies/clean"
            @click="setActive('clean')"
            >清潔洗劑</router-link
          >
          <router-link
            class="list-group-item list-group-item-action"
            :class="{ active: $route.path === '/laundrysupplies/articles' }"
            to="/laundrysupplies/articles"
            @click="setActive('articles')"
            >衣物用具</router-link
          >
        </div>
        <router-view style="width: 85%" class=""></router-view>
      </div>
    </main>
  </div>
</template>

<script>
import ShoppingBubble from "@/components/reception/shoppingBubble.vue";
export default {
  components: {
    ShoppingBubble,
  },
};
</script>

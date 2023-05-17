<template>
  <div class="bg">
    <header
      class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow"
    >
      <router-link class="navbar-brand col-md-3 col-lg-2 me-0 px-3" to="/home">
        日盛洗衣店
      </router-link>

      <button
        class="navbar-toggler position-absolute d-md-none collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#sidebarMenu"
        aria-controls="sidebarMenu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="navbar-nav">
        <div class="nav-item text-nowrap">
          <a class="nav-link px-3" href="#" @click.prevent="signout()">登出 </a>
        </div>
      </div>
    </header>
    <RearNavbar></RearNavbar>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>
<style scoped>
.bg {
  background: #ffffff;
  height: 100vh;
}
</style>
<script>
import RearNavbar from "./RearNavbar.vue";
export default {
  components: { RearNavbar },
  methods: {
    signout() {
      const vm = this;
      const url = `${process.env.VUE_APP_API}/logout`;
      this.$http.post(url).then((response) => {
        if (response.data.success) {
          vm.$router.push("/signin");
        }
      });
    },
  },
};
</script>

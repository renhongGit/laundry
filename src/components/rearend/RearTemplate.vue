<template>
  <div>
    <header
      class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow"
    >
      <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#"
        >日盛洗衣店</a
      >
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
      <input
        class="form-control form-control-dark w-100"
        type="text"
        placeholder="請輸入手機末五碼"
        aria-label="Search"
      />
      <div class="navbar-nav">
        <div class="nav-item text-nowrap">
          <a class="nav-link px-3" href="#">登出 </a>
        </div>
      </div>
    </header>
    <RearNavbar></RearNavbar>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import RearNavbar from "./RearNavbar.vue";
export default {
  components: { RearNavbar },
};
</script>

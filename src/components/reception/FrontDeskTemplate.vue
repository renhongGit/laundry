<template>
  <div>
    <Navbar></Navbar>
    <main>
      <router-view></router-view>
    </main>
    <!-- 底部 -->

    <footer class="container row mx-auto text-center border-top py-3 my-4">
      <div class="col">
        <p>嘉義市西區友愛路190號</p>
        <p>周一至周六 10:00~22:00</p>
        <p>國定假日公休</p>
      </div>
      <div class="col">
        <a href="mailto:renhong.f2e@gmail.com">
          <i class="bi bi-envelope-at fs-3 text m-2"></i
        ></a>
        <a href="https://www.facebook.com/laundry6166/?locale=zh_TW">
          <i class="bi bi-facebook fs-3 text m-2"></i
        ></a>
        <a href="tel:+886-5-2337765"
          ><i class="bi bi-whatsapp fs-3 text m-2"></i
        ></a>
      </div>
      <div class="col">
        <router-link to="/signin"
          ><i class="bi bi-wrench fs-5 text m-2"></i>
        </router-link>
      </div>
    </footer>
  </div>
</template>

<script>
import Navbar from "./Navbar.vue";
export default { components: { Navbar } };
</script>

<template>
  <header class="site-header sticky-top py-1">
    <nav
      class="container d-flex flex-column flex-md-row justify-content-between"
    >
      <router-link class="py-2" to="/home">
        <a href="#" aria-label="Product">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            class="d-block mx-auto"
            role="img"
            viewBox="0 0 24 24"
          >
            <title>Product</title>
            <circle cx="12" cy="12" r="10" />
            <path
              d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83m13.79-4l-5.74 9.94"
            />
          </svg>
        </a>
      </router-link>

      <router-link
        class="py-2 d-none d-md-inline-block"
        to="/laundrysupplies/clean"
      >
        洗衣用品
      </router-link>
      <router-link class="py-2 d-none d-md-inline-block" to="/washingstatus">
        送洗狀態
      </router-link>
      <router-link class="py-2 d-none d-md-inline-block" to="/shopping">
        購物車
      </router-link>
    </nav>
  </header>
</template>

<template>
  <div>
    <nav
      id="sidebarMenu"
      class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
    >
      <div class="position-sticky pt-3">
        <ul class="nav flex-column">
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/registration">
              送洗登記
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/progressquery">
              進度查詢
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

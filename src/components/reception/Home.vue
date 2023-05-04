<template>
  <div>
    <main>
      <div
        class="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light"
      >
        <div class="col-md-5 p-lg-5 mx-auto my-5">
          <h1 class="display-4 fw-normal">日盛洗衣店</h1>
          <p class="lead fw-normal">專門處裡特殊污漬．採用無菌處裡</p>
        </div>
        <div class="product-device shadow-sm d-none d-md-block"></div>
        <div
          class="product-device product-device-2 shadow-sm d-none d-md-block"
        ></div>
      </div>

      <div class="col-md-5 p-lg-5 mx-auto my-5 text-center">
        <p class="lead fw-normal">
          日盛洗衣服務，採用日式生化乾洗的方式並以無菌處理，擁有 10
          多年的經驗，提供專業的洗滌方式與建議。衣物髒污、床組洗滌、西裝乾洗或是皮革保養？<br />歡迎來店諮詢！
        </p>
        <a href="javascript:" @click="goServiceLocation('#servicelocation')"
          >服務位置</a
        >
      </div>
      <div class="mx-auto text-center mb-5">
        <h3 class="fs-2 text fw-bold mb-3">洗衣服務</h3>
        <div class="row row-cols-2 row-cols-md-4 g-4 w-75 mx-auto">
          <div class="col">
            <div class="card border-0 mx-auto">
              <div class="card-body mx-auto text-center">
                <i class="bi bi-droplet-half fs-3 text"></i>
                <h5 class="card-title fw-bolder fs-4 mt-3 mb-2">日式乾洗</h5>
                <p class="card-text fw-bolder">提供日式生化乾洗服務</p>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card border-0">
              <div class="card-body mx-auto text-center">
                <i class="bi bi-file-text fs-3 text"></i>
                <h5 class="card-title fw-bolder fs-4 mt-3 mb-2">專業建議</h5>
                <p class="card-text fw-bolder">
                  提供專業洗滌建議<br />讓您的衣物保持最佳狀態
                </p>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card border-0">
              <div class="card-body mx-auto text-center">
                <i class="bi bi-currency-dollar fs-3 text"></i>
                <h5 class="card-title fw-bolder fs-4 mt-3 mb-2">價優服務</h5>
                <p class="card-text fw-bolder">
                  平價優質服務<br />給您最好的洗滌體驗
                </p>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card border-0">
              <div class="card-body mx-auto text-center">
                <i class="bi bi-box-fill fs-3 text"></i>
                <h5 class="card-title fw-bolder fs-4 mt-3 mb-2">床組包裝</h5>
                <p class="card-text fw-bolder">
                  床組提供真空包裝<br />方便攜帶和儲存
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mx-auto text-center m-5">
        <h3 id="servicelocation" class="fs-2 text fw-bold">服務位置</h3>

        <a href="https://goo.gl/maps/cQKa3ix7ZWPx4mVo6 " target="_blank"
          ><div id="map" class="w-75 mx-auto m-4"></div
        ></a>
      </div>
    </main>
  </div>
</template>

<style scoped>
#map {
  width: 50%;
  height: 300px;
}
</style>

<script>
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
import markerIcon2xUrl from "leaflet-css/dist/images/marker-icon-2x.png";
import markerShadowUrl from "leaflet-css/dist/images/marker-shadow.png";
export default {
  mounted() {
    this.createMap();
  },
  methods: {
    goServiceLocation(point) {
      this.$el.querySelector(point).scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    },
    createMap() {
      let zoom = 17; // 0 - 18
      let center = [23.4805759, 120.4342358, 17]; // 中心點座標
      let map = this.$L.map("map").setView(center, zoom);
      this.$L
        .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap", // 商用時必須要有版權出處
          zoomControl: true, // 是否秀出 - + 按鈕
        })
        .addTo(map);
      // 加入圖示
      const icon = this.$L.icon({
        iconUrl: markerIcon2xUrl,
        shadowUrl: markerShadowUrl,
        iconSize: [25, 41], // 圖示大小
        shadowSize: [41, 41], // 圖示影子大小
        iconAnchor: [12, 41], // 圖示位置（基準點）相對於圖示左上角
        shadowAnchor: [12, 41], // 圖示影子位置（基準點）相對於圖示影子左上角
        popupAnchor: [0, -30], // 彈出視窗位置相對於圖示位置
      });
      const marker = this.$L.marker(center, { icon }).addTo(map);
      marker.bindPopup("<b>日盛洗衣店</b><br>嘉義市友愛路190號").openPopup();
    },
  },
};
</script>

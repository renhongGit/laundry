<template>
  <div>
    <loading :active.sync="isLoading"></loading>

    <main>
      <div
        class="position-relative overflow-hidden p-3 p-md-5 text-center bg-light bg-store"
      >
        <div class="col-md-5 p-lg-5 mx-auto my-5 bg-shadow text-light rounded">
          <h1 class="display-4 fw-normal">日盛洗衣店</h1>
          <p class="lead fw-normal">專門處裡特殊污漬．採用日式生化水性乾洗</p>
          <a
            href="javascript:"
            class="fs-3 goToWashing"
            @click="goServiceLocation('#servicelocation')"
            ><i class="bi bi-caret-right"></i> 來店諮詢
            <i class="bi bi-caret-left"></i>
          </a>
        </div>
      </div>

      <div class="col-md-5 p-lg-5 mx-auto my-5 text-center w-100">
        <div class="parallax-section">
          <div class="background-overlay"></div>
          <p class="lead fs-3 fw-bold">
            擁有 10 多年的經驗
            <br />提供您專業的洗滌方式與建議
          </p>
        </div>
        <div class="parallax-section-2">
          <div class="background-overlay-2"></div>
          <p class="lead fs-3 fw-bold">
            日式生化乾洗
            <br />提供您高品質的衣物洗滌服務
          </p>
        </div>
      </div>
      <div class="mx-auto text-center mb-5">
        <h3 class="fs-2 text fw-bold mb-5">洗衣服務</h3>
        <div class="mb-5 row row-cols-2 row-cols-md-4 g-4 w-75 mx-auto">
          <div class="col">
            <div class="card border border-3 mx-auto h-100">
              <div class="card-body mx-auto text-center">
                <i class="bi bi-droplet-half fs-3 text"></i>
                <h5 class="card-title fw-bolder fs-4 mt-3 mb-2">日式乾洗</h5>
                <p class="card-text fw-bolder">提供日式生化乾洗服務</p>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card border border-3 h-100">
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
            <div class="card border border-3 h-100">
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
            <div class="card border border-3 h-100">
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

      <div class="mx-auto text-center m-5 pt-5 pb-4">
        <h3 id="servicelocation" class="fs-2 text fw-bold">服務位置</h3>

        <a href="https://goo.gl/maps/cQKa3ix7ZWPx4mVo6 " target="_blank"
          ><div id="map" class="w-75 mx-auto m-4 border border-3"></div
        ></a>
      </div>
    </main>
  </div>
</template>

<style scoped>
.bg-store {
  background-image: url("@/assets/Picture/9ce08392-5e7b-4eb0-86eb-dd7f4d7463c4.jpg");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px 5px rgba(255, 255, 255, 0.5) inset;
}
.bg-shadow {
  background: #000000da;
  animation: fadeIn 2s ease-in;
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.parallax-section {
  position: relative;
  height: 400px;
  background-image: url("@/assets/Picture/147db268-1682-448f-8e61-f8f8154d79f6.jpg");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 8%;
}
.parallax-section::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 46%;
  width: 50px;
  height: 110%;
  background-color: #f0f8ff;
  transform: translate(50%, -50%) rotate(-10deg);
  z-index: 12;
}

.parallax-section p {
  color: #f0f7fd;
  text-align: center;
  margin-left: 15%;
  z-index: 10;
}
.parallax-section-2 {
  position: relative;
  height: 400px;
  background-image: url("@/assets/Picture/307a121b-f317-421e-a74d-4b6a5f657892.jpg");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  display: flex;
  flex-direction: row; /* 将排列方向改为水平从左到右 */
  justify-content: flex-end;
  align-items: center;
}
.parallax-section-2::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 48%;
  width: 50px;
  height: 110%;
  background-color: #f0f8ff;
  transform: translate(0%, -50%) rotate(10deg);
  z-index: 12;
}

.parallax-section-2 p {
  color: white;
  text-align: center;
  margin-right: 15%;
  z-index: 10;
}

.background-overlay {
  position: absolute; /* 相对于父元素定位 */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.801),
    rgba(0, 0, 0, 0.25)
  );
}
.background-overlay-2 {
  position: absolute; /* 相对于父元素定位 */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to left,
    rgba(0, 0, 0, 0.606),
    rgba(0, 0, 0, 0.25)
  );
}
@media (max-width: 767px) {
  .parallax-section,
  .parallax-section-2 {
    justify-content: center;
  }
  .parallax-section p,
  .parallax-section-2 p {
    margin: 0%;
  }
  .parallax-section::after,
  .parallax-section-2::after {
    display: none;
  }
}

#map {
  width: 50%;
  height: 300px;
}
@keyframes fadeInScale {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
  100% {
    opacity: 0;
    transform: scale(1);
  }
}

.goToWashing {
  animation: fadeInScale 2s infinite;
}
.card {
  transition: transform 0.3s ease;
}

.card:hover {
  transform: scale(1.1);
}

.photo {
  object-fit: cover;
  object-position: center center;
  width: 400px;
  height: 425px;
}
</style>

<script>
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
import markerIcon2xUrl from "leaflet-css/dist/images/marker-icon-2x.png";
import markerShadowUrl from "leaflet-css/dist/images/marker-shadow.png";

export default {
  data() {
    return {
      isLoading: true,
    };
  },
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
      this.isLoading = false;
    },
  },
};
</script>

<template>
  <div>
    <main class="container mx-auto text-center mt-5">
      <div class="row align-items-md-stretch">
        <div class="col-md-6">
          <div class="h-100 p-4 text-white bg-dark rounded-3">
            <a href="https://goo.gl/maps/cQKa3ix7ZWPx4mVo6 " target="_blank"
              ><div id="map" class="w-100"></div
            ></a>
          </div>
        </div>
        <div class="col-md-6">
          <div class="h-100 p-5 bg-light border rounded-3">
            <h2 class="mt-4">營業時間</h2>
            <p class="mb-4">
              周一至周六 <br />
              上午 9:00 ~ 晚間 10:00 <br />
              國定假日公休 <br />
            </p>
            <a
              class="btn btn-outline-primary"
              href="tel:+886-5-2337765"
              role="button"
              >(05)-2337765</a
            >
            <a
              class="btn btn-outline-primary"
              href="tel:+886-933359198"
              role="button"
              >(09)-33359198</a
            >
          </div>
        </div>
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
export default {
  mounted() {
    this.createMap();
  },
  methods: {
    createMap() {
      let zoom = 17; // 0 - 18
      let center = [23.4805759, 120.4342358, 17]; // 中心點座標
      let map = L.map("map").setView(center, zoom);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap", // 商用時必須要有版權出處
        zoomControl: true, // 是否秀出 - + 按鈕
      }).addTo(map);
      const marker = L.marker(center, {
        title: "",
        opacity: 1.0,
      }).addTo(map);
      marker.bindPopup("<b>日盛洗衣店</b><br>嘉義市友愛路190號").openPopup();
    },
  },
};
</script>

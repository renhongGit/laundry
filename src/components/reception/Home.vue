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
        <a href="">服務位置</a>
      </div>

      <!-- 步驟 -->
      <div>
        <div class="d-md-flex flex-md-equal w-75 ps-md-3 mt-4 mx-auto">
          <div
            class="me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden"
          >
            <div class="my-5 p-3">
              <h2>Step 1</h2>
              <p class="lead">將衣物or床組。。。。</p>
            </div>
          </div>
          <div
            class="bg-light me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden rounded-pill"
          >
            <div
              class="bg-body shadow-sm mx-auto"
              style="width: 80%; height: 300px; border-radius: 21px 21px 0 0"
            ></div>
          </div>
        </div>

        <div class="d-md-flex flex-md-equal w-75 ps-md-3 mt-4 mx-auto">
          <div
            class="bg-light me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden rounded-pill"
          >
            <div
              class="bg-body shadow-sm mx-auto"
              style="width: 80%; height: 300px; border-radius: 21px 21px 0 0"
            ></div>
          </div>
          <div
            class="me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden"
          >
            <div class="my-5 p-3">
              <h2>Step 2</h2>
              <p class="lead">確認洗滌方式與時間</p>
            </div>
          </div>
        </div>

        <div class="d-md-flex flex-md-equal w-75 ps-md-3 mt-4 mx-auto">
          <div
            class="me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden"
          >
            <div class="my-5 p-3">
              <h2>Step 3</h2>
              <p class="lead">等待3~5個工作天</p>
            </div>
          </div>
          <div
            class="bg-light me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden rounded-pill"
          >
            <div
              class="bg-body shadow-sm mx-auto"
              style="width: 80%; height: 300px; border-radius: 21px 21px 0 0"
            ></div>
          </div>
        </div>

        <div class="d-md-flex flex-md-equal w-75 ps-md-3 mt-4 mx-auto">
          <div
            class="bg-light me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden rounded-pill"
          >
            <div
              class="bg-body shadow-sm mx-auto"
              style="width: 80%; height: 300px; border-radius: 21px 21px 0 0"
            ></div>
          </div>
          <div
            class="me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden"
          >
            <div class="my-5 p-3">
              <h2>Step 4</h2>
              <p class="lead">提供手機末五碼取件</p>
            </div>
          </div>
        </div>
      </div>

      <div
        id="carouselExampleControls"
        class="carousel slide container py-5 mt-5 w-100 ratio ratio-21x9"
        data-bs-ride="carousel"
      >
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              src="https://images.pexels.com/photos/325876/pexels-photo-325876.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              class="d-block w-100"
              alt=""
            />
          </div>
          <div class="carousel-item">
            <img
              src="https://images.pexels.com/photos/5854032/pexels-photo-5854032.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              class="d-block w-100"
              alt=""
            />
          </div>
          <div class="carousel-item">
            <img
              src="https://images.pexels.com/photos/4959886/pexels-photo-4959886.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              class="d-block w-100"
              alt=""
            />
          </div>
        </div>
        <div>
          <button
            class="carousel-control-prev w-50"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next w-50"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

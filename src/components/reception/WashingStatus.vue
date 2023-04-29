<template>
  <div>
    <main class="container mx-auto text-center mt-5">
      <input
        class="form-control form-control-dark w-50 mx-auto"
        type="text"
        placeholder="請輸入手機末五碼查詢"
        aria-label="Search"
      />

      <h2 class="mt-5">送洗進度</h2>
      <h4 class="mt-3">李小姐</h4>
      <div class="table-responsive mt-3">
        <table class="table table-striped table-sm align-middle">
          <thead>
            <tr>
              <th scope="col">送洗日期</th>
              <th scope="col">洗滌內容</th>
              <th scope="col">目前進度</th>
              <th scope="col">付款狀態</th>
              <th scope="col">備註</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2023/4/16 - 13:23</td>
              <td>襯衫:3件 , 西裝:1套 , 床組:1組</td>
              <td>洗滌處理中</td>
              <td>尚未付款 $550 TWD</td>
              <td>
                襯衫送洗前有破損，<br />西裝送洗前有退色，<br />並已告知顧客，同意送洗。
              </td>
            </tr>
            <tr>
              <td>2023/3/19 - 11:20</td>
              <td>羽絨外套:2件</td>
              <td>已取件</td>
              <td>已付款 3/23 - 10:40</td>
              <td></td>
            </tr>
            <tr>
              <td>2023/2/26 - 10:35</td>
              <td>棉T:6件</td>
              <td>已取件</td>
              <td>已付款 3/1 - 15:55</td>
              <td>
                送洗前已告知污漬只能儘量處理，<br />污漬經處理後有輕微改善。
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>

<template>
  <div id="views-thecustomer_footer">
    <b-row>
      <b-col
        class="d-flex
        flex-column pl-5"
        md="3"
      >
        <b>商品分類</b>
        <a href="#">原生蘭</a>
        <a href="#">春天開花</a>
        <a href="#">夏天開花</a>
        <a href="#">秋天開花</a>
        <a href="#">冬天開花</a>
      </b-col>
      <b-col
        class="d-flex
        flex-column pl-5"
        md="3"
      >
        <b>問與答</b>
        <a href="#">最新公告</a>
        <a href="#">新手須知</a>
        <a href="#">服務條款</a>
        <a href="#">退貨政策</a>
      </b-col>
      <b-col
        class="d-flex
        flex-column pl-5"
        md="3"
      >
        <b>關於 Orchids 市集</b>
        <a href="#">關於原生蘭</a>
        <a href="#">蘭園資訊</a>
      </b-col>
      <b-col
        class="d-flex
        flex-column pl-5"
        md="3"
      >
        <b>追蹤 Orchids</b>
        <facebook />
        <instagram />
        <youtube />
      </b-col>
    </b-row>

    <hr class="my-2">
    <b-row>
      <b-col
        class="d-flex justify-content-start align-items-center pl-5"
        md="5"
      >
        <b-img
          alt="orchids"
          class="mr-3 "
          height="40px"
          src="https://image.flaticon.com/icons/svg/898/898143.svg"
          width="40px"
        />
        <h5 class="mb-0">
          Orchids 蘭花購物網
        </h5>
      </b-col>
      <b-col class="d-flex justify-content-end align-items-center">
        <span class="mr-3">本網站僅供作業練習用</span>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'TheCustomerFooter'
}
</script>

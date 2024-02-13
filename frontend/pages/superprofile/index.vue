<template lang="">
  <div> <div class="page-container"> <div class="collector"> <img
  alt="Image"class="circle-image" > <div class="user-info"> <p>Name:{{
    username
  }}</p> <p>Phonenumber:{{ phonenumber }}</p> <p>Role:{{ role }}</p> </div> <h1
  class="latest-bill-heading">บันทึกบิลล่าสุด</h1> <ul class="bill-list"> <li
  class="bill-item" id="bill-item-1"><a href="/link-to-other-page"></a></li> <li
  class="bill-item" id="bill-item-2"><a href="/link-to-other-page"></a></li> <li
  class="bill-item" id="bill-item-3"><a href="/link-to-other-page"></a></li> </ul> </div>
  </div> </div>
</template>

<script>
</script>

<style scopde>
.circle-image {
  width: 200px;
  height: 400px;
  border-radius: 50%;
  display: flex;
}

.user-info {
  text-align: center;
  margin-top: 20px;
  padding: 20px;
  border: 2px solid #ccc;
  border-radius: 10px;
  background-color: #f0f0f0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 450px; /* กำหนดความกว้างสูงสุดเป็น 450px */
  height: 120px; /* กำหนดความสูงเป็น 450px */
  margin: auto;
}

.latest-bill-heading {
  margin-top: 20px;
  font-size: 24px;
  color: #007bff;
  text-decoration: underline;
  text-align: center; /* เพิ่มคุณสมบัตินี้เพื่อให้ตัวหนังสืออยู่กลาง */
}

.bill-list {
  list-style-type: none;
  padding: 0;
  margin-top: 20px;
}

.bill-item {
  width: 250px;
  height: 50px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  margin-bottom: 10px;
  cursor: pointer;
  display: none;
  justify-content: center;
  align-items: center;
}

.bill-item:hover {
  background-color: #0056b3;
}
</style>

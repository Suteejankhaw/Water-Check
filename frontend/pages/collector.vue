<script setup>
definePageMeta({
  layout: "landing",
});
</script>
<template>
    <div class="page-container">
    <div class="collector">
      <img src="assets/images/Waltherwhite.jpg" alt="Image" class="circle-image">
      <div class="user-info">
        <p>ID:api</p> 
        <p>Name:api</p>
        <p>Phonenumber:api</p> 
        <p>Role:api</p> 
        <p>Land:api</p>
      </div>
      <router-link to="/Houselist" class="house-button">รายการบ้าน</router-link>
      <router-link to="/other-page" class="save-button">ดูบิลทั้งหมด</router-link>
       <h1 class="latest-bill-heading">บันทึกบิลล่าสุด</h1>
    <ul class="bill-list">
      <li class="bill-item"><a href="/link-to-other-page"></a>บิลที่ 1</li>
      <li class="bill-item"><a href="/link-to-other-page"></a>บิลที่ 2</li>
      <li class="bill-item"><a href="/link-to-other-page"></a>บิลที่ 3</li>
      <li class="bill-item"><a href="/link-to-other-page"></a>บิลที่ 4</li>
    </ul>
    </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Collector'
  };
  </script>
  
  <style scoped>
.collector {
    display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color:white;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.collector {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.circle-image {
  width: 200px;
  height: 400px;
  border-radius: 50%;
}

.user-info {
  text-align: center;
  margin-top: 20px;
  padding: 20px;
  border: 2px solid #ccc;
  border-radius: 10px; /* เพิ่มขอบมนุษย์ให้กับ container */
  background-color: #f0f0f0; /* เพิ่มสีพื้นหลัง */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* เพิ่มเงาเริ่มต้น */
}

.house-button, .save-button {
  width: 200px;
  height: 200px;
  border-radius: 25px;
  margin-top: 20px;
}

.save-button {
  text-decoration: none;
  background-color: #294178;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px; /* กำหนดความกว้าง */
  height: 500px; /* กำหนดความสูง */
  border-radius: 15px; /* กำหนดรัศมีของมุม */
  box-shadow: #ccc;
}

.house-button {
  text-decoration: none;
  background-color: #28a745;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px; /* กำหนดความกว้าง */
  height: 300px; /* กำหนดความสูง */
  border-radius: 15px; /* กำหนดรัศมีของมุม */
}
.latest-bill-heading {
  margin-top: 20px;
  font-size: 24px;
  color: #007bff; 
  text-decoration: underline;
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
  display: flex;
  justify-content: center;
  align-items: center;
}

.bill-item:hover {
  background-color: #0056b3;
}
  </style>
  
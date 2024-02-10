<template>
    <div class="page-container">
    <div class="collector">
      <img alt="Image" class="circle-image" >
      <div class="user-info">
        <p>ID:{{ userId }}</p> 
        <p>Name:{{ username }}</p>
        <p>Phonenumber:{{ phonenumber }}</p> 
        <p>Role:{{ role }}</p> 
      </div>
      <p class="house-button" @click="goToAllHome()">รายการบ้าน</p>
      <p class="save-button" @click="goToAllBill()">ดูบิลทั้งหมด</p>
       <h1 class="latest-bill-heading">บันทึกบิลล่าสุด</h1>
    <ul class="bill-list">
      <li class="bill-item" id="bill-item-1"><a href="/link-to-other-page"></a></li>
      <li class="bill-item" id="bill-item-2"><a href="/link-to-other-page"></a></li>
      <li class="bill-item" id="bill-item-3"><a href="/link-to-other-page"></a></li>
    </ul>
    </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  const runtimeConfig = useRuntimeConfig()
  let BASE_URL = runtimeConfig.public.BASE_URL

  const route = useRoute()
  const users = await $fetch(BASE_URL + `/users/${route.params.id}`, {
    method: 'GET',
  })
  let username = ref(users.username)
  let userId = ref(users.id)
  let phonenumber = ref(users.phone_no)
  let role = ref(users.role)

  const router = useRouter()
  const goToAllHome = () => {
    router.push(`/A1_testAPI/allHome`)
  }
  const goToAllBill = () => {
    router.push(`/A1_testAPI/allBill`)
  }

  const bills = await $fetch(BASE_URL + `/bills`, {
    method: 'GET',
  })

  // Sorting bills
  const sortedBills = bills.sort((a, b) => {
    const dateA = new Date(a.dateTime || '1000-12-31');
    const dateB = new Date(b.dateTime || '1000-12-31');
    return dateB - dateA;
  })

  onMounted(() => {
    document.querySelector('.circle-image').src =`assets/images/users/${users.Image_iD}.jpg`; // img user

    setTimeout(() => {
      let count = 1;
      sortedBills.forEach(bill => {
        if (count < 4 && bill.collector.id === users.id) {
          const latestBill = document.querySelector(`#bill-item-${count}`);
          latestBill.textContent = `บิลที่: ${bill.id}   บ้านเลนที่: ${bill.land.id}`;
          latestBill.style.display = "flex";
          count++;
        }
      });
    });
  });
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
  display: none;
  justify-content: center;
  align-items: center;
}

.bill-item:hover {
  background-color: #0056b3;
}
  </style>
  
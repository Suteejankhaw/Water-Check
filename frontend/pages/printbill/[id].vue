<template>
    <div class="printbill">
      <!-- รูปภาพบ้าน -->
      <div class="image-container">
        <img src="/assets/images/1.jpg" alt="Home">
      </div>
      
      <!-- containers ของกล่องข้อความ -->
      <div class="text-container">
        <div class="detail">
          <strong>บ้านเลขที่:</strong> {{ houseNumber }}
        </div>
        <div class="detail">
          <strong>เจ้าของบ้าน:</strong> {{ owner }}
        </div>
        <div class="detail">
          <strong>หมายเลขมิเตอร์:</strong> {{ meterNumber }}
        </div>
        <div class="status">
          <strong>Status:</strong> 
          <span :class="{ 'red': status === 'ค้างชำระ', 'green': status === 'ชำระเสร็จสิ้น' }">{{ status }}</span>
        </div>
      </div>
      
      <!-- ช่องป้อนข้อมูลค่าน้ำ -->
      <div class="water-bill">
        <strong style="font-size: 24px;">ค่าน้ำ:</strong><br>
        <input type="number" placeholder="กรอกค่าน้ำ" style="width: 100%;" v-model="waterCost">
        <br>
        <strong style="font-size: 24px;">หน่วยการใช้น้ำ:</strong><br>
        <input type="number" placeholder="กรอกหน่วยการใช้น้ำ" style="width: 100%;" v-model="waterUsage">
        <br>
        <button @click="saveBill">บันทึกบิล</button>
      </div>
    </div>
  </template>
  
<script setup>
  import { ref } from 'vue';
  import { useRoute } from 'vue-router'
  
  const runtimeConfig = useRuntimeConfig();
  const BASE_URL = runtimeConfig.public.BASE_URL;
  const route = useRoute()
  const id = ref(parseInt(route.params.id));

  const houseNumber = ref('');
  const owner = ref('');
  const meterNumber = ref('');
  const status = ref('');

  function getCurrentMonth() {
    const currentDate = new Date();
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return monthNames[currentDate.getMonth()];
  }

  const fetchData = async () => {
    try {
      const lands = await $fetch(BASE_URL + `/lands/${id.value}`, {
        method: 'GET',
      });

      const sortedBills = lands.bill.sort((a, b) => {
        const dateA = new Date(`${a.month} 1, 2022`);
        const dateB = new Date(`${b.month} 1, 2022`);
        return dateB - dateA;
      });
      const latestBill = sortedBills[0];
      const billStatus = latestBill.month === getCurrentMonth() + " " + new Date().getFullYear() ? 'ชำระเสร็จสิ้น' : 'ค้างชำระ';

      houseNumber.value = lands.id;
      owner.value = lands.user.fullname;
      meterNumber.value = lands.meter_no;
      status.value = billStatus;

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  onMounted(() => {
    fetchData();
  });


  const waterCost = ref('');
  const waterUsage = ref(''); 

  const saveBill = async () => {
    try {
      // ดึง Me(collectorId) จาก URL ?Me=
      const urlParams = new URLSearchParams(window.location.search);
      const meValue = urlParams.get('Me');

      const dateTime = new Date().toISOString();

      const response = await $fetch(BASE_URL + '/bills', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cost_value: waterCost.value,
          unit_value: waterUsage.value,
          month: getCurrentMonth() + " " + new Date().getFullYear(),
          dateTime: dateTime,
          land: {
            id: houseNumber.value, 
          },
          collector: {
            id: meValue,
          },
        }),
      });
      console.log('Server Response:', response);
      if (!response.ok) {
        console.error('Error saving bill:', response.statusText);
        return;
      }
    } catch (error) {
      console.error('Error saving bill:', error);
    }
  };
</script>
  
  <style scoped>
  .printbill {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .image-container {
    margin-bottom: 20px;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .image-container img {
    max-width: 50%;
    height: auto;
  }
  
  .text-container {
    border: 1px solid #ccc;
    padding: 10px;
    width: 50%;
    background-color: #f9f9f9;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    margin-bottom: 20px; /* เพิ่มระยะห่างด้านล่าง */
  }
  
  .detail {
    margin-bottom: 10px;
    font-size: 16px;
    color: #333;
  }
  
  .status {
    font-size: 16px;
    margin-top: 10px;
  }
  
  .red {
    color: red;
  }
  
  .green {
    color: green;
  }
  
  .water-bill {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  input[type="number"] {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
    margin-bottom: 10px;
  }
  
  button {
    padding: 10px 20px;
    background-color: green;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    max-width: 50%;
  }
  </style>
  
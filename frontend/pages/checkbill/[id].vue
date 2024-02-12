<template>
  <div class="flex flex-col items-center space-y-8">
    <!-- Image container -->
    <div class="rounded-lg overflow-hidden shadow-lg">
      <img class="w-full h-auto" :src="landImage" alt="Home">
    </div>

    <!-- Text container -->
    <div class="p-6 bg-white shadow-lg rounded-lg">
      <h2 class="text-2xl font-bold mb-4">บ้านเลขที่: {{ houseNumber }}</h2>
      <p class="text-lg mb-2"><strong>เจ้าของบ้าน:</strong> {{ owner }}</p>
      <p class="text-lg mb-2"><strong>หมายเลขมิเตอร์:</strong> {{ meterNumber }}</p>
      <p class="text-lg mb-2"><strong>ที่อยู่:</strong> {{ landAddress }}</p>
      <p class="text-lg mb-4"><strong>Status:</strong>
        <span>{{ status }}</span>
      </p>
    </div>

    <!-- Payment history header -->
    <header class="text-2xl font-bold text-center mb-4">
      ประวัติการชำระ
    </header>
    <div class="space-y-4">
      <div class="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-inner gap-2">
        <div class="text-center">มกราคม, 2566</div>
        <PrettyBtn content="Check" @click="" :isFullWidth="false" />
      </div>
    </div>
  </div>
</template>
 
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'

  const runtimeConfig = useRuntimeConfig();
  const BASE_URL = runtimeConfig.public.BASE_URL;
  const route = useRoute()
  const id = ref(parseInt(route.params.id));

  const houseNumber = ref('123/45');
  const owner = ref('John Doe');
  const meterNumber = ref('M-123456');
  const status = ref(''); // Initialize status as an empty string
  const landAddress = ref('');
  const landImage = ref('');

  function getCurrentMonthAndYear() {
    const currentDate = new Date();
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
  }

  const fetchData = async () => {

    try {
      const land = await $fetch(BASE_URL + `/lands/${id.value}`, {
        method: 'GET',
      });
      const currentMonthAndYear = getCurrentMonthAndYear();
      const sortedBills = land.bill.sort((a, b) => {
        const dateA = new Date(`${a.month}  1,  2022`);
        const dateB = new Date(`${b.month}  1,  2022`);
        return dateB - dateA;
      });
      const billStatus = sortedBills.some(bill => bill.month === currentMonthAndYear)
        ? 'ชำระเสร็จสิ้น'
        : 'ค้างชำระ';

      houseNumber.value =  land.id
      owner.value = land.user.fullname
      meterNumber.value = land.meter_no
      status.value = billStatus
      landAddress.value = land.address
      landImage.value =  `/houses/house${land.id}.jpg`
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  onMounted(() => {
    fetchData();
  });

  const navigateToAnotherPage = () => {
    window.location.href = '/savebills'; // Use window.location.href for navigation
  };
</script>



  
<style scoped>
.checkbill {
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
  margin-bottom: 20px;
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

.payment-header {
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 20px;
  text-align: center;
}

.check-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
}

.check-button:hover {
  background-color: #0056b3;
}

.payment-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}
</style>
  
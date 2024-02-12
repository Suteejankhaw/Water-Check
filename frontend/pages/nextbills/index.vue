<template>
    <div>
      <div class="box-container">
        <div v-for="(house, index) in houses" :key="index" class="box">
          <img :src="house.image" alt="House Image">
        </div>
      </div>
    </div>
  </template>
  
<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router'
  
  const runtimeConfig = useRuntimeConfig();
  const BASE_URL = runtimeConfig.public.BASE_URL;
  
  const houses = ref([]);

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
    const lands = await $fetch(BASE_URL + '/lands', {
      method: 'GET',
    });
    houses.value = lands.map(land => {
      const sortedBills = land.bill.sort((a, b) => {
        const dateA = new Date(`${a.month} 1, 2022`);
        const dateB = new Date(`${b.month} 1, 2022`);
        return dateB - dateA;
      });
      const latestBill = sortedBills[0];

      const billStatus = latestBill.month === getCurrentMonth() + " " + new Date().getFullYear() ? 'ชำระเสร็จสิ้น' : 'ค้างชำระ';

      return {
        id: land.id,
        housesId: `บ้านเลขที่ ${land.id}`,
        image: `/houses/house${land.id}.jpg`,
        bills: sortedBills,
        billStatus: billStatus,
      };
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const router = useRouter()
const gotoCheckBill = (houseId) => {
  router.push(`/checkbill/${houseId}`);
};

onMounted(() => {
  fetchData();
});
</script>
  
  <style scoped>
  .box-container {
    display: flex;
    flex-wrap: wrap;
  }
  
  .box {
    width: 200px;
    height: 200px;
    margin: 10px;
    border: 1px solid #ccc;
  }
  
  .box img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  </style>
  
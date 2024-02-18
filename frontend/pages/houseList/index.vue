<template>
  <div class="container">
    <header>HOUSELIST</header>
    <div class="search-container">
      <input type="text" placeholder="Search..." v-model="searchQuery">
    </div>
    <div class="box-container" v-if="!loading">
      <div class="box-container">
        <div class="box" v-for="house in filteredHouses" :key="house.housesId">
          <div class="overlay">{{ house.housesId }}</div>
          <div class="overlay">{{ house.billStatus }}</div>
          <div class="image-container">
            <img :src="house.image" alt="Image">
            <button class="bill-button" @click="gotoCheckBill(house.id)">บันทึกบิล</button>
          </div>
        </div>
        <div v-if="filteredHouses.length === 0" class="no-results">ไม่พบข้อมูลบ้านเลขที่</div>
      </div>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'

const runtimeConfig = useRuntimeConfig();
const BASE_URL = runtimeConfig.public.BASE_URL;

const searchQuery = ref('');
const houses = ref([]);
const loading = ref(true);

const filteredHouses = computed(() => {
  return houses.value.filter(house => house.id.toLowerCase().includes(searchQuery.value.toLowerCase()));
});

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
    loading.value = false;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const router = useRouter()
const gotoCheckBill = (houseId) => {
  const urlParams = new URLSearchParams(window.location.search);
  const meValue = urlParams.get('Me');
  router.push(`/checkbill/${houseId}?Me=${meValue}`);
};

onMounted(() => {
  fetchData();
});
</script>


<style scoped>
.container {
  display: grid;
  place-items: center;
  height: 100vh;
  padding: 20px;
}

.search-container {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

.search-container input[type=text] {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 300px;
}

.search-container button {
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #17f034;
  cursor: pointer;
}

.box-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  grid-auto-flow: row;
}

.box {
  border: 1px solid #ccc;
  position: relative;
  overflow: hidden;
}

.image-container {
  position: relative;
}

.bill-button {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  background-color: #17f034;
  color: #fff;
  cursor: pointer;
}

.bill-button:hover {
  background-color: #0d7f26;
}

header {
  color: #a423ee;
  font-size: 30px;
  text-decoration: underline;
}

.no-results {
  text-align: center;
  color: red;
}
</style>

<template>
    <div class="all-bills">
      <header>
        <strong>ดูบิลทั้งหมด</strong>
      </header>
      <div class="box-container-wrapper">
        <div v-for="(data, index) in boxData.slice(startIndex, endIndex)" :key="index" class="box-container">
          <!-- แสดงข้อมูลที่ได้รับจาก API แต่ละกล่อง -->
          <div @click="goToSingleBill(data.id)">
            {{ ` ${data.billId} ${data.housesId} ${data.month} ` }}
          </div>
        </div>
      </div>
      <button @click="toggleShowMore">
        {{ showMore ? "Show Less" : "Show More" }}
      </button>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'

const runtimeConfig = useRuntimeConfig();
const route = useRoute()
const router = useRouter()
const BASE_URL = runtimeConfig.public.BASE_URL;

const boxData = ref([]);
const startIndex = ref(0);
const endIndex = ref(20);
const showMore = ref(true);

const toggleShowMore = () => {
  showMore.value = !showMore.value;

  if (showMore.value) {
    endIndex.value = boxData.value.length;
  } else {
    endIndex.value = startIndex.value + 20;
  }
};

const fetchData = async () => {
  try {
    const bills = await $fetch(BASE_URL + '/bills', {
      method: 'GET',
    });
    boxData.value = bills.map(bill => {
      return {
        id: bill.id,
        billId: `บิลที่: ${bill.id}`,
        housesId: `บ้านเลนที่: ${bill.land.id}`,
        month: `บิลของเดือน: ${bill.month}`,
        dateTime: `จ่ายวันที่: ${bill.dateTime}`,
      };
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const goToSingleBill = (billId) => {
    const urlParams = new URLSearchParams(window.location.search);
    const meValue = urlParams.get('Me');
    router.push(`/singleBillCollector/${billId}?Me=${meValue}`)
  }
onMounted(() => {
  fetchData();
});
</script>
  
  <style scoped>
  .all-bills {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 24px;
    
}
  
  .box-container-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 20px;
  }
  
  .box-container {
    border-radius: 15px;
    background-color: #f0f0f0; /* สีเทา */
    padding: 20px;
    margin: 10px;
  }
  </style>
  
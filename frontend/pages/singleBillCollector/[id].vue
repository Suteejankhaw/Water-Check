<template>
  <div class="min-h-screen bg-slate-200 flex items-center justify-center">
    <div class="bg-white shadow-md rounded-lg max-w-xl w-full p-8">
      <ImageById :imageId="landId"/>

      <div class="space-y-4">
        <h1 class="text-2xl font-semibold text-gray-700">Belong to <span class="font-bold">{{ month }}</span></h1>
        <dl class="grid grid-cols-2 gap-4 text-lg text-gray-700">
          <dt><span class="font-bold">Bill Number:</span></dt>
          <dd>{{ billId }}</dd>
          <dt><span class="font-bold">Bill Collector:</span></dt>
          <dd>{{ collectorFullname }}</dd>
          <dt><span class="font-bold">House Address:</span></dt>
          <dd>{{ landAddress }}</dd>
          <dt><span class="font-bold">Homeowner:</span></dt>
          <dd>{{ userFullname }}</dd>
          <dt><span class="font-bold">Usage Amount:</span></dt>
          <dd>{{ costValue }}</dd>
          <dt><span class="font-bold">Total Payment:</span></dt>
          <dd>{{ totalCost }} Baht</dd>
          <dt><span class="font-bold">Payment Date:</span></dt>
          <dd>{{ dateTime }}</dd>
        </dl>
      </div>

      <PrettyBtn content="Go Back" @click="goBack" :isFullWidth="true" class="mt-4"/>
    </div>
  </div>
</template>
 
<script lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()

    const id =  ref(route.params.id)
    const billId = ref(null)
    const fullname = ref('?')
    const landId = ref(1)
    const landAddress = ref('?')
    const userId = ref('')
    const unitValue = ref(0)
    const costValue = ref(0)
    const dateTime = ref('')
    const collectorUsername = ref('')
    const collectorFullname = ref('')
    const month = ref('')
    const totalCost = computed(() => unitValue.value * costValue.value)
    const userFullname = ref('')

    onMounted(async () => {
      try {
        // Fetch bill data
        const billApiPath = `http://localhost:5000/bills/${id.value}`
        const billResponse = await fetch(billApiPath)
        if (!billResponse.ok) {
          throw new Error(`HTTP error! status: ${billResponse.status}`)
        }
        const billData = await billResponse.json()

        billId.value = billData.id
        fullname.value = billData.collector.fullname
        landId.value = parseInt(billData.land.id, 10)
        landAddress.value = billData.land.address
        unitValue.value = billData.unit_value
        costValue.value = billData.cost_value
        dateTime.value = new Date(billData.dateTime).toLocaleString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false, // Use  24-hour clock
        })
        collectorUsername.value = billData.collector.username
        collectorFullname.value = billData.collector.fullname
        month.value = billData.month

        // Fetch land data to get the user's fullname
        const userApiPath = `http://localhost:5000/users/${landId.value}`
        const userResponse = await fetch(userApiPath)
        if (!userResponse.ok) {
          throw new Error(`HTTP error! status: ${userResponse.status}`)
        }
        const userData = await userResponse.json()

        userFullname.value = userData.fullname // Store the user's fullname
        userId.value = userData.id
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error)
      }
    })


    const goBack = () => {
      // ตรวจสอบว่าต้องการให้กลับไปครั้งเดียวเท่านั้น
      if (!hasGoneBack) {
        // ใช้เมธอด `go` ของ router พร้อมกับค่าลบเพื่อกลับไปที่หน้าก่อนหน้านี้
        router.go(-1);
        // ตั้งค่าตัวแปรเพื่อบอกว่าได้ทำการกลับไปแล้ว
        hasGoneBack = true;
      }
    };

    // ตัวแปรเพิ่มเติมเพื่อเก็บสถานะการกลับ
    let hasGoneBack = false;

    return {
      landId,
      billId,
      fullname,
      landAddress,
      unitValue,
      costValue,
      dateTime,
      collectorUsername,
      collectorFullname,
      month,
      totalCost,
      userFullname,
      goBack,
    }
  },

}
</script>



 
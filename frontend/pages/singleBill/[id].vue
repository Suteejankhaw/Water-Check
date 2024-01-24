<template>
  <div class="flex justify-center items-center h-screen bg-slate-200">
    <div class="flex flex-col h-full w-1/2 my-10 px-8 bg-white">
      <img src="assets\images\1.jpg" alt="Image" class="w-full h-52 object-cover mx-auto mb-4">

      <div class="flex flex-col space-y-2">
        <h1 class="text-2xl text-gray-700 mb-4">Bill in <span class="font-bold">{{ month }}</span> </h1>
        <p class="text-lg text-gray-700">หมายเลขบิล: <span class="font-bold">{{ billId }}</span></p>
        <p class="text-lg text-gray-700">บ้านเลขที่: <span class="font-bold">{{ landId }}</span></p>
        <p class="text-lg text-gray-700">เจ้าของบ้าน: <span class="font-bold">{{ fullname }}</span></p>
        <p class="text-lg text-gray-700">ค่าน้ำจำนวน: <span class="font-bold">{{ cost }}</span></p>
        <p class="text-lg text-gray-700">ชำระวันที่: <span class="font-bold">{{ paidDate }}</span></p>
        <p class="text-lg text-gray-700">ผู้จ่ายบิล: <span class="font-bold">{{ collectorName }}</span></p>
      </div>

      <PrettyBtn content="ย้อนกลับ" @click="goBack"/>
    </div>
  </div>
</template>
 

<script lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

export default {
  setup() {
    const route = useRoute()
    const billId = ref(route.params.id)

    // stored data from fetch database
    const fullname = "นายอมลำแก้ว พรองใหญ่"
    const landId = "127"
    const unit = 20
    const cost = unit * 7
    const paidDate = "3/Jan/2024"
    const collectorName = "นายเจ้าชายจูลี่ อัลเบริต"
    const month = "January"

    return {
      billId,
      fullname,
      landId,
      cost,
      paidDate,
      collectorName,
      month,
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
  }
}
</script>
 
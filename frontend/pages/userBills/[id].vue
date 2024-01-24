vue
<template>
  <div class="flex flex-col gap-4 bg-slate-200 h-screen p-8">
    <PrettyBtn content="<" @click="goBack" />
    <div class="p-8 bg-white rounded-md">

      <div class="flex flex-row items-center justify-start">
        <h1 class="text-2xl font-bold mb-4 mx-auto">User's ID: {{ id }}</h1>
      </div>

      <table class="w-full my-8 whitespace-nowrap overflow-x-scroll shadow-md rounded-lg bg-gray-100">
        <thead>
          <tr>
            <th class="px-4 py-2 text-center">Bill ID</th>
            <th class="px-4 py-2 text-center">Amount</th>
            <th class="px-4 py-2 text-center">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="bill in bills" :key="bill.id" @click="goToBillDetails(bill.id)"
            class="cursor-pointer hover:bg-gray-200">
            <td class="px-4 py-2 text-center">{{ bill.id }}</td>
            <td class="px-4 py-2 text-center">{{ bill.amount }}</td>
            <td class="px-4 py-2 text-center">{{ bill.date }}</td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>


 
 


<script>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default {
  setup() {
    const route = useRoute()
    const id = ref(route.params.id)
    const router = useRouter()

    const bills = [
      { id: 1, amount: 100, date: '2021-01-01' },
      { id: 2, amount: 200, date: '2021-02-01' },
      { id: 3, amount: 300, date: '2021-03-01' },
    ];

    const goToBillDetails = (billId) => {
      // Navigate to the next route using Vue Router
      router.push(`/singleBill/${billId}`)
    }

    const goBack = () => {
      router.back()
    }

    return {
      id,
      bills,
      goToBillDetails,
      goBack
    }
  },
};
</script>
 

  
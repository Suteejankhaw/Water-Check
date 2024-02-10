<template>
  <div class="flex flex-col gap-4 bg-slate-200 h-screen p-8">
    <PrettyBtn content="<" @click="goBack" :isFullWidth="false" />
    <div class="p-8 bg-white rounded-md">
      <div class="flex flex-row items-center justify-start">
        <h1 class="text-2xl font-bold mb-4 mx-auto">All Bills of {{ fullname }}</h1>
      </div>

      <table class="w-full my-8 whitespace-nowrap overflow-x-scroll shadow-md rounded-lg bg-gray-100">
        <thead class="border-b border-blue-500">
          <tr>
            <th class="px-4 py-2 text-center text-blue-500">Bill ID</th>
            <th class="px-4 py-2 text-center text-blue-500">Amount (THB)</th>
            <th class="px-4 py-2 text-center text-blue-500">Belong to</th>
            <th class="px-4 py-2 text-center text-blue-500">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="bill in bills" :key="bill.id" @click="goToBillDetails(bill.id)"
            class="cursor-pointer hover:bg-gray-200">
            <td class="px-4 py-2 text-center">{{ bill.id }}</td>
            <td class="px-4 py-2 text-center">{{ bill.amount }}</td>
            <td class="px-4 py-2 text-center">{{ bill.month }}</td>
            <td class="px-4 py-2 text-center">{{ formatDateTime(bill.date) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default {
  setup() {
    const route = useRoute()
    const id = ref(route.params.id)
    const fullname = ref('')
    const router = useRouter()
    const bills = ref([]) // Initialize bills as a reactive reference

    // Function to fetch user data by ID
    const fetchUserDataBills = async () => {
      try {
        const response = await fetch(`http://localhost:5000/users/${id.value}/lands-and-bills`);
        if (!response.ok) throw new Error('Failed to fetch user');

        const data = await response.json();
        // Flatten the bills array from the nested structure
        fullname.value = data.fullname
        bills.value = data.lands.flatMap(land => land.bill.map(bill => ({
          id: bill.id,
          amount: parseFloat(bill.cost_value) * parseFloat(bill.unit_value),
          date: bill.dateTime,
          month: bill.month
        })));
      } catch (error) {
        console.error('Error fetching user:', error);
        // Handle redirection or other fallback logic here
      }
    };

    // Call fetchUserData when the component mounts
    onMounted(fetchUserDataBills);

    const goToBillDetails = (billId) => {
      // Navigate to the next route using Vue Router
      router.push(`/singleBill/${billId}`)
    }

    const goBack = () => {
      router.push(`/userInfo/${id.value}`);
    }

    // Computed property to format the date and time
    const formatDateTime = (isoString) => {
      const date = new Date(isoString);
      const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return date.toLocaleString('en-US', options);
    };

    return {
      id,
      fullname,
      bills,
      goToBillDetails,
      goBack,
      formatDateTime, // Return the computed property
    };
  },
};
</script>

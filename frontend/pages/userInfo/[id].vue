<template>
  <div class="min-h-screen bg-slate-200 flex items-center justify-center">
    <div class="max-w-md w-full bg-white p-8 rounded-md shadow-md">
      <h1 class="text-2xl font-bold mb-4 text-center">Information</h1>

      <ImageById :imageId="id"/>

      <div class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div><span class="font-bold">User ID:</span></div>
          <div>{{ id }}</div>
          <div><span class="font-bold">Username:</span></div>
          <div>{{ username }}</div>
          <div><span class="font-bold">Fullname:</span></div>
          <div>{{ fullname }}</div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div><span class="font-bold">Address:</span></div>
          <div>{{ landAdress }}</div>
          <div><span class="font-bold">Meter No:</span></div>
          <div>{{ meter_no }}</div>
          <div><span class="font-bold">Phone Number:</span></div>
          <div>{{ phone_no }}</div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div><span class="font-bold">Status:</span></div>
          <div><span :class="getComputeClass">{{ showStatus }}</span></div>
        </div>
      </div>
      <PrettyBtn content="History" :isFullWidth="true" @click="goToNewPath" class="mt-4" />
      <table v-if="!onStatus" class="w-full mt-4">
        <thead>
          <tr>
            <th>- Don't pay yet -</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(needed, index) in needToPaid" :key="index">
            <td class="text-center font-bold text-red-600">{{ needed }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>




<script lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default {
  setup() {
      const checkBillAt = ['January2024', 'February2024'];
      let needToPaid = [] as string[];
      const port = 8000
      const apiPathUser = `http://localhost:5000/users/`
      const apiPathUserLandBills = `http://localhost:5000/lands/user-bills/`;

      const route = useRoute()
      const id = ref(parseInt(route.params.id as string,  10));

      // Reactive variable to store user data
      const userData = ref(null);


      // User Attributes
      const username = ref('') // Declare username variable
      const fullname = ref('') // Declare fullname variable
      const phone_no = ref('') // Declare phone number variable
      const meter_no = ref('')
      const landAdress = ref('')

      const overdueMonths = ref([]);
      const onStatus = ref(false)
      const showStatus = ref('')


      const router = useRouter()

      const goToNewPath = async () => {
          const response = await fetch(`http://localhost:${port}/userBills/${id.value}`)

          if (response.ok) {
              router.push(`/userBills/${id.value}`);
          } else {
              console.error('Failed to hit the custom endpoint')
          }
      }

      // Function to fetch user data by ID
      const fetchUserData = async () => {
          try {
              const response = await fetch(apiPathUser + id.value);
              if (!response.ok) throw new Error('Failed to fetch user');

              const data = await response.json();
              userData.value = data; // Store the entire user data object

              // Assign individual properties to the reactive variables
              username.value = data.username;
              fullname.value = data.fullname;
              phone_no.value = data.phone_no;

              console.log(data);
          } catch (error) {
              console.error('Error fetching user:', error);

              // got to not found page
              const response = await fetch(`http://localhost:${port}/userInfo`)

              if (response.ok) {
                  router.push(`/userInfo`);
              } else {
                  console.error('Failed to hit the custom endpoint')
              }
          }




          try {
              const response = await fetch(apiPathUserLandBills + id.value);
              if (!response.ok) throw new Error('Failed to fetch user');

              const data = await response.json();

              landAdress.value = data.address;
              meter_no.value = data.meter_no;

              console.log(data);
              
              const allMonthsArray = getAllMonthsFrom2024();
              overdueMonths.value = getAllMonthsFrom2024(); 
              data.bill.forEach(bill => {
                allMonthsArray.forEach(month => {
                  if (bill.month === month) {
                    overdueMonths.value = overdueMonths.value.filter(months => months !== month);
                  }
                });
              });

              for (const month of overdueMonths.value) {
                    const hasMonthBill = data.bill.some((bill: { month: string }) => bill.month.replace(/\s+/g, '') === month);
                    if (!hasMonthBill) {
                        needToPaid.push(month)
                        
                    }
                }

              if (overdueMonths.value.length === 0) {
                  // Not all bills exist, handle accordingly
                  console.log('Not all bills exist for the checked months');
                  onStatus.value = true
              }
              else {
                  onStatus.value = false
              }
              showStatus.value = overdueMonths.value.length === 0
              ? 'ชำระเสร็จสิ้น'
              : 'ค้างชำระ';

          } catch (error) {
              console.error('Error fetching user:', error);

              // Go to not found page
              const response = await fetch(`http://localhost:${port}/userInfo`);

              if (response.ok) {
                  router.push(`/userInfo`);
              } else {
                  console.error('Failed to hit the custom endpoint');
              }
          }


      };

      // Call fetchUserData when the component mounts
      onMounted(fetchUserData);

      function getAllMonthsFrom2024() {
        const currentDate = new Date();
        const startMonth = new Date(2024, 0, 1); // January 2024 (month is 0-indexed)
        const endMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0); // Current month's last day
        const monthsArray = [];
        let currentMonth = new Date(startMonth);
        while (currentMonth <= endMonth) {
          const monthName = currentMonth.toLocaleString('en-US', { month: 'long' });
          const year = currentMonth.getFullYear();
          monthsArray.push(`${monthName} ${year}`);
          currentMonth.setMonth(currentMonth.getMonth() + 1);
        }
        return monthsArray;
      }



      const getComputeClass = computed(() => {
          if (onStatus.value) {
            
            return 'font-bold text-emerald-400'
          }
          else {
            return 'font-bold text-red-600'
          }
      })


      return {
          id,
          phone_no,
          meter_no,
          landAdress,
          fullname,
          onStatus,
          showStatus,
          goToNewPath,
          getComputeClass,
          userData,
          username,
          needToPaid,
      }
  }
}


</script>
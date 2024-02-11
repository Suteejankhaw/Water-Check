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

        const onStatus = ref(false)


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

                for (const month of checkBillAt) {
                    const hasMonthBill = data.bill.some((bill: { month: string }) => bill.month.replace(/\s+/g, '') === month);
                    if (!hasMonthBill) {
                        needToPaid.push(month)
                        
                    }
                }

                if (needToPaid.length > 0) {
                    // Not all bills exist, handle accordingly
                    console.log('Not all bills exist for the checked months');
                    onStatus.value = false
                    
                }
                else {
                    onStatus.value = true
                }

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



        const getComputeClass = computed(() => {
            if (onStatus.value) {
                return 'font-bold text-emerald-400'
            }
            else {
                return 'font-bold text-red-600'
            }
        })


        const showStatus = (onStatus.value) ? "Complete" : "Overdue"


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





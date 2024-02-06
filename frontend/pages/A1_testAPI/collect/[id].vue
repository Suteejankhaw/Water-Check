<template>
    <div>
        <h1>collector</h1>
        <p>name:{{ fullname }}</p>
        <p>collectorID:{{ userId }}</p>
        <button @click="goToAllHome">AllHome</button> <br>
        <button @click="goToAllBill">AllBill</button> <br>
        <p>latestBill</p>
        <div class="latestBill"></div>
    </div>
</template>

<script setup lang="ts">
    import { ref, computed } from 'vue'
    import { useRoute, useRouter } from 'vue-router'

    
    const runtimeConfig = useRuntimeConfig()
    let BASE_URL = runtimeConfig.public.BASE_URL


    const route = useRoute()
    const users = await $fetch(BASE_URL + `/users/${route.params.id}`, {
      method: 'GET',
    })
    let fullname = ref(users.username)
    let userId = ref(users.id)


    const router = useRouter()
    const goToAllHome = () => {
      router.push(`/A1_testAPI/allHome`)
    }
    const goToAllBill = () => {
      router.push(`/A1_testAPI/allBill`)
    }


    const bills = await $fetch(BASE_URL + `/bills`, {
      method: 'GET',
    })
    const sortedBills = bills.sort((a, b) => {
        const dateA = new Date(a.dateTime || '9999-12-31');
        const dateB = new Date(b.dateTime || '9999-12-31');
        return dateB - dateA;
    });
    import { nextTick } from 'vue';
    const latestBillContainer = document.querySelector('.latestBill');
    nextTick(() => {
        let count = 0;
        sortedBills.forEach(bill => {
            if (count < 3 && bill.collector.id === users.id) {
                const latestBill = document.createElement('p');
                latestBill.textContent = `BillID: ${bill.id}  LandID: ${bill.land.id}`;
                count++;
                latestBillContainer.appendChild(latestBill);
            }
        });
    });
</script>
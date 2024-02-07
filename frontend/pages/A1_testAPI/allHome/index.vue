<template>
    <div>
        <p>Homes</p>
        <div class="allHome"></div>
    </div>
</template>

<script setup lang="ts">
    import { ref, computed } from 'vue'
    import { useRoute, useRouter } from 'vue-router'

    
    const runtimeConfig = useRuntimeConfig()
    let BASE_URL = runtimeConfig.public.BASE_URL


    const lands = await $fetch(BASE_URL + `/lands`, {
      method: 'GET',
    })
    setTimeout(() => {
      const allHomeContainer = document.querySelector('.allHome')
      lands.forEach(land => {
        const home = document.createElement('p')
        home.textContent = `HomeID: ${land.id}`
        allHomeContainer.appendChild(home)

        const saveBill = document.createElement('button')
        saveBill.textContent = `saveBill`
        allHomeContainer.appendChild(saveBill)
      });
    });
</script>
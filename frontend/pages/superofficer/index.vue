<template lang="html">
  <div> 
    <div class="card" @click="goToProfile(officer.userId)" v-for="(officer, index) in officers" :key="index"> 
      <img :src="officer.image" alt="Avatar" style="width:100%"> 
      <div class="container"> 
        <h4><b>{{ officer.userfullname }}</b></h4> 
      </div>
    </div> 
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';

  const runtimeConfig = useRuntimeConfig();
  const BASE_URL = runtimeConfig.public.BASE_URL;

  const officers = ref([]);
  const router = useRouter();

  const fetchData = async () => {
    try {
      const users = await $fetch(BASE_URL + '/users', {
        method: 'GET',
      });
      officers.value = users
        .filter(user => user.role === "Collector")
        .map(user => ({
          userId: user.id,
          userfullname: user.fullname,
          image: `/users/user${user.id}.jpg`,
        }));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  onMounted(() => {
    fetchData();
  });

  const goToProfile = (userId) => {
    router.push(`/superprofile/${userId}`);
  };
</script>


<style scoped>
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 40%;
  margin-bottom: 20px; /* เพิ่มช่องว่างด้านล่างระหว่าง card */
  cursor: pointer; /* เพิ่ม cursor เป็น pointer เมื่อนำเมาส์ไปวางที่ card */
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.container {
  padding: 2px 16px;
}
</style>

<template lang="">
  <div class="page-superadmin"> 
    <div class="superadmin"> 
      <img alt="Image" class="circle-image" src=" " /> 
      <div class="user-info">
        <p>ID:{{ userId }}</p> 
        <p>Name:{{ fullname }}</p>
        <p>Phonenumber:{{ phonenumber }}</p> 
        <p>Role:{{ role }}</p> 
      </div>
      <div class="box-superadmin"> 
        <p class="box1-button" @click="goToAllSuper()">เจ้าหน้าที่</p> 
        <p class="box2-button" @click="goToAllBill()">บิลทั้งหมด</p> 
      </div> 
    </div> 
  </div>
</template>


<script setup>
  import { ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router'

  const runtimeConfig = useRuntimeConfig();
  const BASE_URL = runtimeConfig.public.BASE_URL;

  const route = useRoute()
  const id = ref(parseInt(route.params.id));

  const users = await $fetch(BASE_URL + `/users/${id.value}`, {
    method: 'GET',
  });
  let username = ref(users.username)
  let fullname = ref(users.fullname)
  let userId = ref(users.id)
  let phonenumber = ref(users.phone_no)
  let role = ref(users.role)
  onMounted(() => {
    document.querySelector('.circle-image').src =`/users/user${users.id}.jpg`;
  });


  const router = useRouter()
  const goToAllSuper = () => {
    router.push("/superofficer"); 
      }
  const goToAllBill = () => {
    router.push(`/allbills/?Me=${users.id}`)
  }
</script>


<style scoped>
.superadmin {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: white;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.superadmin {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.circle-image {
  width: 200px;
  height: 200px;
  border-radius: 50%;
}

.user-info {
  text-align: center;
  margin-top: 20px;
  padding: 20px;
  border: 2px solid #ccc;
  border-radius: 10px; /* เพิ่มขอบมนุษย์ให้กับ container */
  background-color: #f0f0f0; /* เพิ่มสีพื้นหลัง */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* เพิ่มเงาเริ่มต้น */
}

.box-superadmin {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.box1-button,
.box2-button {
  flex-basis: 50%;
  width: 100px;
  height: 100px;
  border-radius: 10px;
  margin-top: 10px;
  flex-grow: 1;
}

.box1-button,
.box2-button {
  margin-top: 10px;
  margin-bottom: 10px;
  text-decoration: none;
  background-color: #294178;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px; /* กำหนดความกว้าง */
  height: 100px; /* กำหนดความสูง */
  box-shadow: #ccc;
}
</style>

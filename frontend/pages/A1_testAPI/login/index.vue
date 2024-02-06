<template>
  <div>
    <h1>LOGIN</h1>
    <p v-if="loginStatus === 'invalid'">Invalid username or password</p>
    <input type="text" v-model="userId" placeholder="id"> <br>
    <input type="text" v-model="password" placeholder="password"> <br>
    <button @click="login">Login</button>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router'

  const runtimeConfig = useRuntimeConfig()
  let BASE_URL = runtimeConfig.public.BASE_URL
  let userId = ''
  let password = ''
  let loginStatus = ref('')

  const router = useRouter()
  const goToUser = (userId) => {
      router.push(`/userInfo/${userId}`)
  }
  const goToCollector = (userId) => {
      router.push(`/A1_testAPI/collect/${userId}`)
  }
  const goToAdmin = (userId) => {
      router.push(`/A1_testAPI/admin/${userId}`)
  }

  async function login() {
    let ENDPOINT = `/users/${userId}`
    const users = await $fetch(BASE_URL + ENDPOINT, {
      method: 'GET',
    })
    if (password == users.password) {
      if (users.role == 'Admin') {
        console.log('Admin')
        goToAdmin(users.id)
      } else if (users.role == 'Collector') {
        console.log('Collector')
        goToCollector(users.id)
      } else if (users.role == 'User') {
        console.log('User')
        goToUser(users.id)
      }
    } else {
      loginStatus.value = 'invalid'
    }
  }
</script>

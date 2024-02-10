<template>
  <div class="mx-auto flex w-full max-w-sm flex-col">
    <div class="mx-auto flex lg:hidden">
      <NuxtLogo />
    </div>
    <header class="mt-8 text-2xl font-semibold text-write-700 lg:mt-0" style="color: #2f8bf4;">
      ยินดีต้อนรับ
    </header>
    
    <p class="mt-2 text-sm text-indigo-500">โปรดกรอกข้อมูลเพื่อนลงชื่อเข้าใช้</p>
    <p class="mt-5 text-sm font-semibold text-gray-500">หมายเลขบัตรประชาชน</p>
    <input class="mt-1 rounded border py-1 px-3 text-sm shadow" v-model="userId"/>
    <p class="mt-5 text-sm font-semibold text-gray-500">เบอร์โทรศัพท์</p>
    <input
      class="mt-1 rounded border py-1 px-3 text-sm text-sm shadow"
      type="password"
      v-model="phone_no"
    />
    <div class="mt-5 flex items-center">
      <input class="mr-2 align-middle text-sm text-sm" type="checkbox" />
      <p class="text-sm font-semibold text-gray-500">จดจำฉัน</p>
      <span class="flex-1" />
      <a
        href="#"
        class="text-sm font-semibold text-indigo-400 hover:text-indigo-500"
        >ลืมรหัสผ่าน?</a
      >
    </div>
    <button
      class="mt-5 rounded border bg-indigo-400 py-2 px-5 text-sm text-sm font-semibold text-gray-50 shadow hover:bg-indigo-500"
      @click="login()"
    >
      ลงชื่อเข้าใช้
    </button>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router'

  const runtimeConfig = useRuntimeConfig()
  let BASE_URL = runtimeConfig.public.BASE_URL
  let userId = ''
  let phone_no = ''
  let loginStatus = ref('')

  const router = useRouter()
  const goToUser = (userId) => {
      router.push(`/userInfo/${userId}`)
  }
  const goToCollector = (userId) => {
      router.push(`/collectorHome/${userId}`)
  }
  const goToAdmin = (userId) => {
      router.push(`/A1_testAPI/admin/${userId}`)
  }

  async function login() {
    let ENDPOINT = `/users/${userId}`
    const users = await $fetch(BASE_URL + ENDPOINT, {
      method: 'GET',
    })
    if (phone_no == users.phone_no) {
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
      console.log('invalid id or number')
    }
  }
</script>
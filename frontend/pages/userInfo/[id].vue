<template>
    <div class="container mx-auto p-4">
        <h1 class="text-2xl font-bold mb-4">ข้อมูลผู้ใช้</h1>

        <div class="mb-2">
            <p>บ้านเลขที่: <span class="font-bold">{{ landId }}</span></p>
            <p>เจ้าของบ้าน: <span class="font-bold">{{ fullname }}</span></p>
            <p>มิเตอร์เลขที่: <span class="font-bold">{{ meterId }}</span></p>
            <p>ค่าน้ำ: <span class="font-bold">{{ cost }}</span> บาท</p>
            <p>หน่วยที่ใช้: <span class="font-bold">{{ unit }}</span> หน่วย</p>

            <p>สถานะ: <span :class="getComputeClass">{{ showStatus }}</span></p>
        </div>


        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" @click="goToNewPath">
            ดูประวัติบิล
        </button>
    </div>
</template>

<script setup lang="ts">

import { useRouter } from 'vue-router'


const route = useRoute()
const id = route.params.id

let landId = "123/5"
let fullname = "นายพรไชย เทพพิลักษณ์"
let meterId = 12
let unit = 10
let cost = unit * 7

let onStatus = true
let showStatus = (onStatus) ? "ชำระเสร็จสิ้น" : "ค้างชำระ"


const router = useRouter()

const goToNewPath = async () => {
    const response = await fetch('http://localhost:3000/userInfo/')

    if (response.ok) {
        router.push('/userInfo')
    } else {
        console.error('Failed to hit the custom endpoint')
    }
}


const getComputeClass = computed(() => {
    if (onStatus){
        return 'font-bold text-emerald-400'
    }
    else {
        return 'font-bold text-red-600'
    }
})

</script>

<template>
    <div class="container mx-auto p-4 flex flex-col items-center h-screen bg-slate-200">
        <div class="flex flex-col p-8 rounded-md w-1/2 h-auto bg-white">
            <h1 class="text-2xl font-bold mb-4">ข้อมูลผู้ใช้</h1>

            <div class="mb-4">
                <p class="mb-2"><span class="font-bold">userID:</span> {{ id }}</p>
                <p class="mb-2"><span class="font-bold">บ้านเลขที่:</span> {{ landId }}</p>
                <p class="mb-2"><span class="font-bold">เจ้าของบ้าน:</span> {{ fullname }}</p>
                <p class="mb-2"><span class="font-bold">มิเตอร์เลขที่:</span> {{ meterId }}</p>
                <p class="mb-2"><span class="font-bold">ค่าน้ำ:</span> {{ cost }} บาท</p>
                <p class="mb-2"><span class="font-bold">หน่วยที่ใช้:</span> {{ unit }} หน่วย</p>

                <p class="mb-2"><span class="font-bold">สถานะ:</span> <span :class="getComputeClass">{{ showStatus }}</span>
                </p>
            </div>

            <PrettyBtn content="ดูประวัติบิล" @click="goToNewPath" />
        </div>

    </div>
</template>

<script lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default {
    setup() {
        const route = useRoute()
        const id = ref(route.params.id)

        let landId = "175"
        let fullname = "นายพรไชย เทพพิลักษณ์"
        let meterId = 12
        let unit = 10
        let cost = unit * 7

        let onStatus = true
        let showStatus = (onStatus) ? "ชำระเสร็จสิ้น" : "ค้างชำระ"

        const router = useRouter()

        const goToNewPath = async () => {
            const response = await fetch(`http://localhost:3000/userBills/${id}`)

            if (response.ok) {
                router.push(`/userBills/${id.value}`);
            } else {
                console.error('Failed to hit the custom endpoint')
            }
        }

        const getComputeClass = computed(() => {
            if (onStatus) {
                return 'font-bold text-emerald-400'
            }
            else {
                return 'font-bold text-red-600'
            }
        })

        return {
            id,
            landId,
            fullname,
            meterId,
            unit,
            cost,
            onStatus,
            showStatus,
            goToNewPath,
            getComputeClass
        }
    }
}
</script>


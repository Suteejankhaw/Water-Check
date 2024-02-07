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
    <input class="mt-1 rounded border py-1 px-3 text-sm shadow" />
    <p class="mt-5 text-sm font-semibold text-gray-500">เบอร์โทรศัพท์</p>
    <input
      class="mt-1 rounded border py-1 px-3 text-sm text-sm shadow"
      type="password"
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
    >
      ลงชื่อเข้าใช้
    </button>
  </div>
</template>
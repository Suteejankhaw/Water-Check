<template>
    <div>
      <div class="flex">
        <div class="min-h-screen flex-1">
          <div class="flex h-full items-center py-8 px-5">
            <LoginForm />
          </div>
        </div>
        <div class="hidden min-h-screen flex-1 bg-gray-60 px-5 py-5 lg:flex">
          <div class="mx-auto flex h-full items-center">
            <img src="assets/images/logo.jpg" width="450" height="450">
            <NuxtLogo />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    name: 'LoginPage',
    layout: 'login',
    methods :{
        async fetchData() {
      try {
        const response = await axios.get('https://example.com/api/data');
        console.log(response.data); // ตัวอย่างการแสดงผลข้อมูลที่ได้จาก API
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  },
  mounted() {
    // เรียกใช้งาน fetchData เด่อ
    this.fetchData();
  }
}

  </script>
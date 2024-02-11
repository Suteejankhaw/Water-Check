<template>
    <div class="all-bills">
      <header>
        <strong>ดูบิลทั้งหมด</strong>
      </header>
      <div class="box-container-wrapper">
        <div v-for="(data, index) in boxData" :key="index" class="box-container">
          <!-- แสดงข้อมูลที่ได้รับจาก API แต่ละกล่อง -->
          {{ data }}
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        boxData: [] // ข้อมูลที่ได้รับจาก API จะถูกเก็บไว้ในนี้
      };
    },
    methods: {
      fetchDataFromApi() {
        // เรียกใช้ fetch API เพื่อดึงข้อมูลจาก URL_API
        fetch('URL_API')
          .then(response => response.json())
          .then(data => {
            // เมื่อข้อมูลถูกโหลดสำเร็จ กำหนดค่าให้กับ boxData
            this.boxData = data;
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }
    },
    mounted() {
      // เมื่อ component ถูกโหลด เรียกใช้เมธอด fetchDataFromApi() เพื่อดึงข้อมูล
      this.fetchDataFromApi();
    }
  };
  </script>
  
  <style scoped>
  .all-bills {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 24px;
    
}
  
  .box-container-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 20px;
  }
  
  .box-container {
    border-radius: 15px;
    background-color: #f0f0f0; /* สีเทา */
    padding: 20px;
    margin: 10px;
  }
  </style>
  